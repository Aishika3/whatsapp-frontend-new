import { ConversationFlowForm, Documentation, Banner } from "components";
import { Cookies } from "react-cookie";

function Home() {
  const cookies = new Cookies();
  const token = cookies.get("userid");

  return (
    <main className="flex flex-col gap-10 pb-8">
      <Banner />
      <Documentation />
    </main>
  );
}

export default Home;
