import {
    A
} from "solid-start";

export default function Header({ count }: { count: number }) {
    return (
        <header>
            <img src="/image/pokedex.png"></img>
            <nav><A href="/">Accueil</A><A href="/pokedex">Pokedex</A><A href="/sac">Sac({count})</A><A href="/faq">FAQ</A></nav>
        </header>
    );
}