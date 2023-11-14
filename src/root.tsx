// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./assets/styles/master.scss";
import Header from "./components/Header";
import bag from "./assets/data/bag.json";

export default function Root() {
  let count = Object.keys(bag).length;
  console.log(count)

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Pokedex app</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Header count={count}></Header>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
