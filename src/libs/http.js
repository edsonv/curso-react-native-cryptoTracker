export class Http {
  static instance = new Http();

  get = async url => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (error) {
      console.error('HTTP GET method error', error);
      throw Error(error);
    }
  };

  post = async url => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('HTTP POST method error'.error);
      throw Error(error);
    }
  };
}
