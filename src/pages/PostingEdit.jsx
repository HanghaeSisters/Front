import Footer from "../components/Footer/Footer";
import EditForm from "../components/Form/EditForm";
import Header from "../components/Header/Header";
import Layout from "../components/layout/Layout";

const PostingEdit = () => {
  return (
    <>
      <Header />
      <Layout>
        <EditForm />
      </Layout>
      <Footer />
    </>
  );
};

export default PostingEdit;
