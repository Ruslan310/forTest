import React, { useState } from 'react';
import css from './DiscountModal.module.css';
import { FormattedMessage } from '../../util/reactIntl';
import DiscountModal from './DiscountModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearDiscount } from './Discount.duck';

const DiscountPage = () => {

  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const isDiscount = useSelector(state => state.Discount.isDiscount);

  const deleteDiscount = () => dispatch(clearDiscount())

  return (
    <div>
      <DiscountModal modal={modal} setModal={setModal} />
      { !isDiscount
        ? <div className={css.discount} onClick={()=>setModal(true )}>
          <FormattedMessage
            id={'BookingDatesForm.enterDiscountCoupon'}
          />
        </div>
        : <div className={css.discount} onClick={deleteDiscount}>
          <FormattedMessage
            id={'BookingDatesForm.deleteDiscountCoupon'}
          />
        </div>
      }
    </div>
  );
};

export default DiscountPage;
