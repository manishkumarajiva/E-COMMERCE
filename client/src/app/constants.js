export const ITEM_PER_PAGE = 10;

export const STATUS = [ '----','pending', 'dispatched', 'delivered', 'cancelled'];


export const statusColorHandler = (status) => {
    switch(status){
        case 'pending' :
            return 'text-orange-600 bg-orange-100'
        case 'dispatched' :
            return 'text-blue-600 bg-blue-100'
        case 'delivered' :
            return 'text-green-600 bg-green-100'
        case 'cancelled' :
            return 'text-red-600 bg-red-100'
        default : break;
    }
}