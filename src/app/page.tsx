import MainSlider from "@/components/main/main.slider";
import { sendRequestJS } from "@/utils/old.api";
import { Container } from "@mui/material";
export default async function HomePage() {

  // const response = await fetch("htts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     category: "chill",
  //     limit: 10,
  //   })
  // })
  // console.log(await response.json());

  // const response = await sendRequestJS({
  //   url: "https://api.example.com/data",
  //   method: "POST",
  //   body: {
  //     category: "CHILL",
  //     limit: 10,
  //   },
  // })
  // console.log(response);
  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
