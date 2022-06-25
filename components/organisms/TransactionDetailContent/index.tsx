import Link from 'next/link';
import { HistoryTransactionTypes } from '../../../services/data-types';
import Row from './Row';

interface TransactionDetailContentProps {
    data: HistoryTransactionTypes;
}

export default function TransactionDetailContent(props: TransactionDetailContentProps) {
  const { data } = props;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <main className="container-fluid checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="ps-lg-0">
            <h2 className="text-3xl fw-bold text-center color-palette-1 mt-4 mb-30">Details Page</h2>
            <div className="details">
                <div className="main-content main-content-card overflow-auto">
                    <section className="checkout mx-auto">
                        <div className="d-flex flex-row align-items-center justify-content-between mb-30">
                            <div className="game-checkout d-flex flex-row align-items-center">
                                <div className="pe-4">
                                    <div className="cropped d-grid">
                                        <img
                                          src={`${IMG}/${data.historyVoucherTopup.thumbnail}`}
                                          width="200"
                                          height="130"
                                          className="img-fluid"
                                          alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="fw-bold text-xl color-palette-1 mb-10">
                                        {data.historyVoucherTopup.gameName}
                                    </p>
                                    <p className="color-palette-2 m-0">Category: {data.historyVoucherTopup.category}</p>
                                </div>
                            </div>
                            <div>
                                <p className="fw-medium text-center label pending m-0 rounded-pill">{data.status}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="purchase pt-30">
                            <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
                            <Row label="Your Game ID" value={data.accountUser} />
                            <Row label="Order ID" value={`#${data._id}`} />
                            <Row label="Item" value={`${data.historyVoucherTopup.coinQuantity} ${data.historyVoucherTopup.coinName}`} />
                            <Row label="Price" value={data.historyVoucherTopup.price} />
                            <Row label="Tax 10%" value={data.tax} />
                            <Row label="Total" value={data.value} className="color-pallete-4" />
                        </div>
                        <div className="payment pt-10 pb-10">
                            <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
                            <Row label="Your Account Name" value={data.name} />
                            <Row label="Type" value={data.historyPayment.type} />
                            <Row label="Bank Name" value={data.historyPayment.bankName} />
                            <Row label="Bank Account Name" value={data.historyPayment.name} />
                            <Row label="Bank Number" value={data.historyPayment.noRekening} />
                        </div>
                        <div className="d-sm-block d-flex flex-column w-100 gap-3">
                            <Link href="https://wa.me/6282122116992?text=Saya%20sudah%20melakukan%20pembayaran%20untuk%20TopUp%20Voucher">
                                <a
                                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                                  target="_blank"
                                  role="button"
                                  rel="noreferrer"
                                >WhatsApp
                                </a>
                            </Link>
                            {' '}
                            <Link href="/">
                                <a
                                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                                  role="button"
                                  rel="noreferrer"
                                >Kembali
                                </a>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>
  );
}
