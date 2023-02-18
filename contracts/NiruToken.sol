// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

contract NiruToken{
 string public name="NiruToken";
 string public symbol="NIRU";
 string public standard="NiruToken v.0.1";
 uint256 public totalSupply;
 uint256 public _userId;
 address public ownerOfContract;
 address[] public tokenHolder;

 struct TokenHolderInfo{
 uint256 _tokenId;
 address _from;
 address _to;
 uint256 _totalToken;
 bool _tokenHolder;
 }
 mapping(address=>TokenHolderInfo) public TokenHolderInfos;
 mapping(address=>mapping(address=>uint256)) public Allowance;

 event Transfer(address indexed _from, address indexed _to, uint256 _value);
 event Approval(address indexed _owner, address indexed _spender, uint256 _value);
 
 mapping(address=> uint256) public BalanceOf;
 constructor (uint256 _initialSupply){
 ownerOfContract=msg.sender;
 BalanceOf[msg.sender]=_initialSupply;
 totalSupply=_initialSupply;
 }

 function inc() internal{
     _userId++;
 } 

 function transfer(address _to, uint256 _value) public returns(bool success){
     require(BalanceOf[msg.sender]>=_value,"Insufficient Funds");
     inc();
     BalanceOf[msg.sender] -= _value; 
     BalanceOf[_to] += _value;

     TokenHolderInfo storage tokenholderinfo = TokenHolderInfos[_to];
     tokenholderinfo._tokenId = _userId;
     tokenholderinfo._from = msg.sender;
     tokenholderinfo._to = _to;
     tokenholderinfo._totalToken = _value;
     tokenholderinfo._tokenHolder = true;

     tokenHolder.push(_to);
     emit Transfer(msg.sender, _to, _value);
     return true;

 }

//  This Function will allow owner to decide whom to give approval to transfer token on behalf of owner.
 function approve(address _spender, uint256 _value) public returns(bool success){
     Allowance[msg.sender][_spender]=_value;
     emit Approval(msg.sender, _spender, _value);
     return true;
 }

 // This function will only allow  transfer of tokens to those user who got approval from owner to transfer tokens .
 function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
     BalanceOf[_from] -= _value;
     BalanceOf[_to] +=_value;
     Allowance[_from][msg.sender] -=_value;
     emit Transfer(_from, _to, _value);
     return true;
 }
 
 function getTokenHolderData(address _address) public view returns(uint256 , address, address, uint256, bool){
   return(
        TokenHolderInfos[_address]._tokenId,
        TokenHolderInfos[_address]._from,
        TokenHolderInfos[_address]._to,
        TokenHolderInfos[_address]._totalToken,
        TokenHolderInfos[_address]._tokenHolder
    );
 }
 // we have use memory keyword because we want to get just reference of address and we want to reduce gas fees.
  function getTokenHolder() public view returns(address[] memory){
     return(tokenHolder);
  }
}