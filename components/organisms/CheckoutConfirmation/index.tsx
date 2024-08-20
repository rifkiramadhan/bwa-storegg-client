import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { setCheckout } from '../../../services/player';

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    const dataItemLocal = localStorage.getItem('data-item');
    const dataTopUpLocal = localStorage.getItem('data-topup');

    const dataItem = JSON.parse(dataItemLocal!);
    const dataTopUp = JSON.parse(dataTopUpLocal!);

    if (!checkbox) {
      toast.error('Silahkan Refresh kembali dan Pastikan Anda telah menchecklist persetujuan pembayaran Top Up!');
      return;
    }
    const data = {
      voucher: dataItem._id,
      nominal: dataTopUp.nominalItem._id,
      payment: dataTopUp.paymentItem.payment._id,
      bank: dataTopUp.paymentItem.bank._id,
      name: dataTopUp.bankAccountName,
      accountUser: dataTopUp.verifyID,
    };

    const response = await setCheckout(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      router.push('/complete-checkout');
      toast.success('Checkout Anda Berhasil');
    }
  };

  return (
    <>
        <label className="checkbox-label text-lg color-palette-1">I have transferred the money
            <input type="checkbox" checked={checkbox} onChange={() => setCheckBox(!checkbox)} />
            <span className="checkmark" />
        </label>
        <div className="d-md-block d-flex flex-column w-100 pt-50">
          {
            loading ? (
            <button
              className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
              type="button"
              disabled
            >
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              {' '}
              Loading..
            </button>
            ) : (
            <button
              className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
              type="button"
              onClick={onSubmit}
            >Confirm Payment
            </button>
            )
          }
        </div>
    </>
  );
}