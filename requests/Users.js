import {JPClient} from '../clients/JPClient';

const user_endpont = '/users';

const getUsers = () => {
  return JPClient.get(user_endpont);
};

export {getUsers};
