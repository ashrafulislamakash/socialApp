import { JPCclient } from '../clients/JPClient'

const user_endpont = './Users.js'


const getUsers = () => {

    return JPCclient.get(user_endpont);
}

export { getUsers };