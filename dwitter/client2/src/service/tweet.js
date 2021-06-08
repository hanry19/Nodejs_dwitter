export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /* 
  server에서 respionse를 가져올건데 fetch를 이용한다. 그래서 url을 전달해줘야하는데
  baseURL을 반복적으로 적어도 되지만 constructor로 외부로 부터 가져올 거다.
   
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  이렇게 하면 전달받은 baseURL을 이용해서 tweet을 받아 올 수 있다. 

  username이 전달 됐을 때, 안됐을 때 전체적인 tweet을 받아 올건지 특별한 user의 tweet을 받아올건지
  결정해야한다.  그렇기 때문에 username이 전달된다면 username을 지정해주고 그렇지 않으면 빈 문자열을 보낸디

    const query = username ? `?username= ${username}` : '';
    const response = await fetch(`${this.baseUrl}/tweets${query}` , );

  그리고 fetch다음에 option을 전달해줘야하는데,
   option 은 {} method : 'GET', headers: {'Content-Tpye': 'application.json'},}
    
  */
   async getTweets(username) {

    const query = username ? `?username= ${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method : 'GET', 
      headers: {'Content-Tpye': 'application.json'},
    } );

  /* 그리고 받아온 데이터를 json으로 변환 
    만약 status가 200이 아니라면  서버에서 던지는 메소드를 이용
  */
  const data = await response.json();
  if(response.status !== 200){

    throw new Error(data.message);
  }
  return data;

  }


  // post 도 비슷 query필요없고 tweet의 url을 그대로 전달, 그리고 body를 전달해줘야한다.
  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets/`, {
      method : 'POST', 
      headers: {'Content-Tpye': 'application.json'},
      body : JSON.stringify({
        text, 
        username : 'hsj', 
        name:'aaaa'
      }),
    });

    const data = await response.json();
    //개선필요
    if(response.status !== 201){
      throw new Error(data.message);
    }
    return data;
    }

    async deleteTweet(tweetId) {
      const response = await fetch(`${this.baseURL}/tweets/${tweetId}` ,{
        method : 'DELETE', 
        headers: {'Content-Tpye': 'application.json'},
      } );
  
    if(response.status !== 204){
      const data = await response.json();
      throw new Error(data.message);
    }
  
  }
  

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }


}