import Navbar from '../Navbar';
import Footer from '../Footer';
import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>PokeNext</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"/>

            </Head>
            <Navbar />
            <main className='main-container'>
                {children}
            </main>
            <Footer />
        </>
    );
}