// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LeonidaCasino  {
    address public owner;
    uint256 private totalStakedAmount;
    uint256 private finalLaunchWeek;

    struct StakingInfo {
        uint256 stakedAmount;
        uint256 predictWeek;
    }

    address[] public allAddresses;
    mapping(address => StakingInfo) public stakedBalance;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyUser() {
        require(stakedBalance[msg.sender].predictWeek > 0, "Sender has no staked balance");
        _;
    }

    function setFinalLaunchWeek(uint256 week) external onlyOwner {
        finalLaunchWeek = week;
    }

    function getStakeInfo(address account) public view returns(StakingInfo memory) {
        return stakedBalance[account];
    }

    function getLaunchDate() public view returns(uint256) {
        return finalLaunchWeek;
    }

    function stake(uint256 predictWeek) external payable {
        require(finalLaunchWeek == 0, "Date announced already");
        require(stakedBalance[msg.sender].predictWeek == 0, "Already staked");
        require(msg.value > 0, "Amount must be greater then zero");
        require(predictWeek > 0 && predictWeek < 53, "Predicated week must be between 1 to 52");

        totalStakedAmount += msg.value;
        allAddresses.push(msg.sender);
        stakedBalance[msg.sender].stakedAmount = msg.value;
        stakedBalance[msg.sender].predictWeek = predictWeek;
    }

    // function calculatePrematureReward(address account) public view returns(uint256) {
    //     uint256 accountPrediction = stakedBalance[account].predictWeek;
    //     uint256 otherPredictor;

    //     for (uint256 i; i < allAddresses.length; i++) {
    //         if (stakedBalance[allAddresses[i]].predictWeek == accountPrediction) {
    //             otherPredictor++;
    //         }
    //     }

    //     uint256 accountReward = totalStakedAmount / otherPredictor;
    //     // uint256 userStakePercentage= (stakedBalance[account].stakedAmount / totalStakedAmount) * 100;
    //     // uint256 accountReward = (userStakePercentage / 100) * totalStakedAmount;

    //     return accountReward;
    // }

    // function calculateFinalReward(address account) public view returns(uint256) {

    //     uint256 accountPrediction = stakedBalance[account].predictWeek;
    //     if(accountPrediction != finalLaunchWeek) {
    //         return 0;
    //     }

    //     uint256 otherPredictor;

    //     for (uint256 i; i < allAddresses.length; i++) {
    //         if (stakedBalance[allAddresses[i]].predictWeek == accountPrediction) {
    //             otherPredictor++;
    //         }
    //     }

    //     uint256 accountReward = totalStakedAmount / otherPredictor;
    //     // uint256 userStakePercentage= (stakedBalance[account].stakedAmount / totalStakedAmount) * 100;
    //     // uint256 accountReward = (userStakePercentage / 100) * totalStakedAmount;

    //     return accountReward;
    // }

    function calculateReward(address account)
        public
        view
        returns (bool, uint256)
    {
        uint256 accountPrediction = stakedBalance[account].predictWeek;
        if (stakedBalance[account].predictWeek == 0) {
            return (false, 0);
        }


        if (finalLaunchWeek != 0 && accountPrediction != finalLaunchWeek) {
            return (true, 0);
        }

        uint256 otherPredictor;

        for (uint256 i; i < allAddresses.length; i++) {
            if (
                stakedBalance[allAddresses[i]].predictWeek == accountPrediction
            ) {
                otherPredictor++;
            }
        }

        uint256 accountReward = totalStakedAmount / otherPredictor;
        // uint256 userStakePercentage= (stakedBalance[account].stakedAmount / totalStakedAmount) * 100;
        // uint256 accountReward = (userStakePercentage / 100) * totalStakedAmount;

        return (true, accountReward);
    }

    function claimReward() external onlyUser {
        (bool success, uint256 reward) = calculateReward(msg.sender);
        require(success, "Account not found in stakedBalance");
        require(reward > 0, "Your prediction was wrong");
        payable(msg.sender).transfer(reward);
        delete stakedBalance[msg.sender];
    }
}
