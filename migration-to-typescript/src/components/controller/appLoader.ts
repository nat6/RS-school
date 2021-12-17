import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'b7d42f96f97143d59d75e512a47a3489',
    });
  }
}

export default AppLoader;
