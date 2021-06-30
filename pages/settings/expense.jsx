import { useState } from "react";
import { useRouter } from "next/router";

function Expense() {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <section>
      <button onClick={goBack}>BACK</button>
      <div className="">
        <h2>Monthly expense:</h2>
        <input type="text" />
      </div>
      <p>tutorial texts</p>
    </section>
  );
}

export default Expense;
