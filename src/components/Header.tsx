import {
    A
} from "solid-start";

export default function Header() {
    return (
        <header>
            <img src="/image/pokedex.png"></img>
            <nav><A href="/">Accueil</A><A href="/pokedex">Pokedex</A><A href="/sac">Sac(0)</A><A href="/faq">FAQ</A></nav>
        </header>
    );
}
