import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { txIsCanceled, txIsDelivered, txIsDeclined } from '../../util/transaction';
import { propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';
import { useSelector } from 'react-redux';

const LineItemUnitPrice = props => {
  const { transaction, isProvider, intl } = props;

  let providerTotalMessageId = 'BookingBreakdown.providerTotalDefault';
  if (txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (txIsDeclined(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDeclined';
  } else if (txIsCanceled(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalCanceled';
  }

  const totalLabel = isProvider ? (
    <FormattedMessage id={providerTotalMessageId} />
  ) : (
    <FormattedMessage id="BookingBreakdown.total" />
  );
  const Discount = useSelector(state => state.Discount);

  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal
  const formattedTotalPrice = formatMoney(intl, totalPrice);

  const totalPriceWithDiscount = () => {
    let discountTotalPrice = formattedTotalPrice.substr(1)
    if(Discount.discountType === '%')  return (discountTotalPrice - (discountTotalPrice * Discount.discountValue / 100))
    if(Discount.discountType === '$')  return (discountTotalPrice - Discount.discountValue).toFixed(2)
    return discountTotalPrice
  }
  console.log(formattedTotalPrice);
  console.log(totalPriceWithDiscount());
  return (
    <>
      <hr className={css.totalDivider} />
      <div className={css.lineItemTotal}>
        <div className={css.totalLabel}>{totalLabel}</div>
        <div className={css.totalPrice}>${totalPriceWithDiscount()}</div>
      </div>
    </>
  );
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
