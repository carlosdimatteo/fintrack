import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Title, MainContainer } from "./Main.styles";
import { Button } from "../../components/Button";

export function Main() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <MainContainer>
      <Title>{`Track your expense`}</Title>
      <Input
        placeholder="Input the value"
        value={username}
        onChange={setUsername}
      />
      <Button
        onClick={() => {
          console.log("clicked");
        }}
      >
        TRACK!!!
      </Button>
    </MainContainer>
  );
}
