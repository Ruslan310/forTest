// ================ Action types ================ //
export const SET_DISCOUNT = 'SET_DISCOUNT';
export const SET_DISCOUNT_ERROR = 'SET_DISCOUNT_ERROR';
export const CLEAR_DISCOUNT = 'CLEAR_DISCOUNT';


// ================ Reducer ================ //

const initialState = {
  discountValue: 0,
  discountType: '',
  isDiscount: false,
  discountError: '',
};


export default function Discount(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_DISCOUNT:
      let discountType = ''
      let discountValue = null
      if (payload.discount.type === 'PERCENT') {
        discountType = '%'
        discountValue = payload.discount.percent_off
      }
      if (payload.discount.type === 'AMOUNT') {
        discountType = '$'
        discountValue = payload.discount.amount_off
      }
      if (payload.discount.type === 'UNIT') {
        discountType = 'days'
        discountValue = payload.discount.unit_off
      }

      return {
        ...state,
        discountValue: discountValue,
        discountType: discountType,
        isDiscount: payload.active,
      };
    case SET_DISCOUNT_ERROR:
      return { ...state, discountError: payload.details };
    case CLEAR_DISCOUNT:
      return { ...state, discountValue: 0,  discountType: '', isDiscount: false, discountError: ''};

    default:
      return state;
  }
}


// ================ Action creators ================ //

export const setDiscount = (payload) => ({
  type: SET_DISCOUNT, payload,
});
export const setDiscountError = (payload) => ({
  type: SET_DISCOUNT_ERROR, payload,
});
export const clearDiscount = () => ({
  type: CLEAR_DISCOUNT
});
