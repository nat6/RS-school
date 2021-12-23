import AppController from '../../components/controller/controller';
import { AppView } from '../../components/view/appView';

interface IApp {
  controller: AppController;
  view: AppView;
  start(): void;
}

export default IApp;
