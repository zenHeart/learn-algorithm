var permuteUnique = function(num, words) {
  const wordsArr =words.split(' ');
  let result=[],temp=[],aux=[]
  let nums = wordsArr;
  nums.sort()
  backtrack(result,temp,nums,aux)
  return result
  function backtrack(result,temp,nums,aux){
      if(aux.length===nums.length){
          result.push(aux.join(''))
      }
      for(let i=0;i<nums.length;i++){
          if(temp[i] || (i>0 && nums[i]===nums[i-1] && !temp[i-1] ))continue
          temp[i]=true
          aux.push(nums[i])
          backtrack(result,temp,nums,aux)
          temp[i]=false
          aux.pop()
      }
  }
};
console.log(permuteUnique(3, 'a b c'))
console.log(permuteUnique(3, 'a b a'))
console.log(permuteUnique(1, 'a b a a d g j hdsf'))
