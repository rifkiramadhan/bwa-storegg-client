import SideBar from '../../../components/organisms/SideBar';
import TransactionContent from '../../../components/organisms/TransactionContent';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
        <SideBar activeMenu="transactions" />
        <TransactionContent />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    }
  }
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
