import React, { useState } from 'react';
import css from './DiscountModal.module.css';
import { FormattedMessage } from '../../util/reactIntl';
import { checkedDiscount } from '../../util/api';
import { connect } from 'react-redux';
import { setDiscount, setDiscountError } from './Discount.duck';

const DiscountModalComponent = props => {

  const {discountType, modal, setModal, discountValue,
    isDiscount, discountError, setDiscount, setDiscountError} = props

  const [voucher, setVoucher] = useState('');

  const handleInputDiscount = (e) => {
    setVoucher(e.target.value);
  };

  const closedModalDiscount = () => {
    setTimeout(() => {
      setVoucher('')
      setDiscountError('')
    }, 700);
    setModal()
  };

  const handleApplyDiscount = async () => {
    let resultVoucher = await checkedDiscount(voucher);
    if (!resultVoucher.active) return setDiscountError(resultVoucher);
    setDiscount(resultVoucher);
  }

  const cancelErrorDiscount = () => {
    setVoucher('')
    setDiscountError('')
  }

  const textDiscount = () => {
    if (!isDiscount && !discountError)
      return (
        <input className={css.inputDiscountModal}
               value={voucher}
               onChange={handleInputDiscount}
               type='text'
               placeholder='Enter a coupon code' />
      );
    if (isDiscount && !discountError) {
      return (
        <p className={css.inputDiscountModal}><FormattedMessage id='DiscountModal.successVoucher'
                            values={{ discountValue, discountType, }}
          /></p>)
    }
    if (!isDiscount && discountError) return <p className={css.errorDiscount}>{discountError}</p>
  }
  const buttonDiscount = () => {
    if(isDiscount && !discountError) {
      return (
        <div className={css.discountButton}>
          <span className={css.checked}> </span>
        </div>
      )}
    if(!isDiscount && !discountError) {
      return (
        <div className={css.discountButton} onClick={handleApplyDiscount}>
          <FormattedMessage id='DiscountModal.successButton' />
        </div>
      )}
    if(!isDiscount && discountError) {return (
      <div className={css.discountButton} onClick={cancelErrorDiscount}>
        <span>Cancel</span>
      </div>
    )}
  }

  // PROMO-qqGUV    %
  // PROMO-CfHTy    $

  return (
    <div className={modal ? css.modalActive : css.modal}
         onMouseDown={closedModalDiscount}>
      <div className={modal ? css.modalContentActive : css.modalContent}
           onMouseDown={e => e.stopPropagation()}>
        <div className={css.wrapperDiscountModal}>
          <div className={css.closedModalDiscount}>
            <p className={css.closed} onClick={closedModalDiscount}>&times;</p>
          </div>
          <p className={css.titleDiscountModal}>
            <FormattedMessage id='DiscountModal.tile' />
          </p>
          {textDiscount()}
          {buttonDiscount()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  discountValue: state.Discount.discountValue,
  discountType: state.Discount.discountType,
  isDiscount: state.Discount.isDiscount,
  discountError: state.Discount.discountError,
});

const mapDispatchToProps = ({
  setDiscount, setDiscountError,
});
const DiscountModal = connect(mapStateToProps, mapDispatchToProps)(DiscountModalComponent);

export default DiscountModal;
