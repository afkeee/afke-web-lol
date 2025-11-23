interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

interface Film {
    title: string;
    year: number;
    length: string;
    genre: string;
    description: string;
    image: string;
}

interface Social {
    name: string;
    url: string;
    icon: string;
}

interface MusicArtist {
    alias: string;
    description: string;
    socials: Social[];
    spotifyEmbed: string;
    backgroundImage: string;
}

export const pinnedProject: Project = {
    title: 'Jõller 2, No Way Home',
    description: 'afke on haige munn ja ei lase mul elada, ma ei saa kasutada oma vaba aega gooning jelqmaxxing seshi jaoks, see pederast äratab mind kell 1 üles kui mul kõige parim sleep elus',
    image: '/portfolio/pinned.webp',
    link: 'https://youtu.be/gV1nq9UEEr8?si=I6HlljQ1xQkvwPMw'
};

export const pinnedProjects: Project[] = [
    {
        title: 'Jölleri koolipäev',
        description: 'afke on haige munn ja ei lase mul elada, ma ei saa kasutada oma vaba aega gooning jelqmaxxing seshi jaoks, see pederast äratab mind kell 1 üles kui mul kõige parim sleep elus',
        image: '/portfolio/pinned.webp',
        link: 'https://www.youtube.com/watch?v=Nr6FafRIAw4'
    },
    {
        title: 'Jõller 2, No Way Home',
        description: 'afke on haige munn ja ei lase mul elada, ma ei saa kasutada oma vaba aega gooning jelqmaxxing seshi jaoks, see pederast äratab mind kell 1 üles kui mul kõige parim sleep elus',
        image: '/portfolio/pinned.webp',
        link: 'https://youtu.be/gV1nq9UEEr8?si=I6HlljQ1xQkvwPMw'
    },
];

export const portfolioProjects: Project[] = [
    {
        title: 'Jöller 2, No Way Home',
        description: 'Peale õnnetut juhtumit, kus Jöller visati tunnist välja spikerdamise eest suure füüsika kontrolltöö ajal, hakkas Jöller kodu poole sammuma. "Jöller 2, No Way Home" räägib Jölleri koduteest ning millistesse täiesti tavalistesse situatsioonidesse ta oma retkel satub.',
        image: '/portfolio/joller2.webp',
        link: 'https://youtu.be/gV1nq9UEEr8?si=I6HlljQ1xQkvwPMw'
    },
    {
        title: 'Ilus Reporter',
        description: 'Lühilugu sellest, kuidas meie kooli reporter koostab uudiseid ja kuidas see kõik on väga tähtis osa koolielust.',
        image: '/portfolio/ilusreporter.webp',
        link: 'https://www.youtube.com/watch?v=g_nnLqFG9Zc'
    },
    {
        title: 'Jölleri koolipäev',
        description: 'Lühilugu sellest, kuidas keskmise kooliõpilase Jölleri koolipäev möödub. Film on täis karaktereid ja nalju. Film on loodud kooliprojekti raames.',
        image: '/portfolio/joller.webp',
        link: 'https://www.youtube.com/watch?v=Nr6FafRIAw4'
    },
    {
        title: 'Sügisball',
        description: 'Kirjanduse kodutöö raames loodud uue seriaali tutvustusvideo, mis peab võtma inspiratsiooni Mati Undi raamatust "Sügisball".',
        image: '/portfolio/Sugisball.webp',
        link: 'https://www.youtube.com/watch?v=ey8wV2vfvKs'
    },
    {
        title: 'Jumal juhatab',
        description: 'Minu Saue Riigigümnaasiumi 11. klassi praktilise töö raames valminud lühifilm sellest, mida võib üks noor inimene mõelda, olles ebakindel oma tuleviku suhtes.',
        image: '/portfolio/Jumal juhatab.webp',
        link: 'https://www.youtube.com/watch?v=d3G4lDtFbDs'
    },
    {
        title: 'Seriaali Kalamaja Blues Reklaam',
        description: 'Sain Vivian Sädlet võimaluse monteerida kokku lühike lühivideo formaadis reklaamvideo seriaalile "Kalamaja Blues". Kusjuures, väga äge sari!',
        image: '/portfolio/kalamajareklaam.webp',
        link: 'https://www.tiktok.com/@kalamajablues/video/7512124477208071426?_t=ZN-8wwyCHXDW8U&_r=1'
    },
    {
        title: 'Sitakoloonia kommuun',
        description: 'Kirjanduse kodutöö raames loodud lühike film, mis kujutab ühe Sitakoloonia kommuuni liikme silmist, milline on Sitakoloonia kommuun.',
        image: '/portfolio/DSC00427.webp',
        link: 'https://www.youtube.com/watch?v=oUg7zLU6CU8&'
    },
    {
        title: 'Vastlakukkel',
        description: 'Väike äge muusikaga sünkroonis visuaalne montaaž vastlakuklist. Selle vaatamine on lihtsalt meeldivust tekitav (satisfying).',
        image: '/portfolio/vastlakukkel 3.webp',
        link: 'https://www.youtube.com/watch?v=TxGsyovnVXs'
    }
];

export const films: Film[] = [
    {
        title: 'Jõller 2, No Way Home',
        year: 2025,
        length: '28min',
        genre: 'Komöödia',
        description: 'Peale õnnetut juhtumit, kus Jöller visati tunnist välja spikerdamise eest suure füüsika kontrolltöö ajal, hakkas Jöller kodu poole sammuma. "Jöller 2, No Way Home" räägib Jölleri koduteest ning millistesse täiesti tavalistesse situatsioonidesse ta oma retkel satub.',
        image: '/filmid/2025.webp'
    },
    {
        title: 'Jölleri koolipäev',
        year: 2023,
        length: '45min',
        genre: 'Komöödia',
        description: 'Lühifilm "Jölleri koolipäev" räägib ühest keskmisest kooliõpilasest Jöllerist ja tema täiesti ja ülenisti "tavalisest" koolipäevast.',
        image: '/filmid/2025.webp'
    },
    {
        title: '???',
        year: 666,
        length: '?? min',
        genre: '???',
        description: '????!',
        image: '/filmid/2025.webp'
    },
];

export const musicArtists: MusicArtist[] = [
    {
        alias: "afke",
        description: "Afke teeb chill lo-fi type muusikat.",
        socials: [
            {
                name: "Spotify",
                url: "https://open.spotify.com/artist/4aRoOmzQZDWdCOgPTvcJCE",
                icon: "simple-icons:spotify"
            },
            {
                name: "YouTube",
                url: "https://music.youtube.com/channel/UCdOaLlloVHuHFq4kpCjKy7g",
                icon: "simple-icons:youtube"
            }
        ],
        spotifyEmbed: "https://open.spotify.com/embed/artist/4aRoOmzQZDWdCOgPTvcJCE?utm_source=generator&theme=0",
        backgroundImage: "/afkewtf.webp"
    },
    {
        alias: "aff.",
        description: "Projekt \"aff.\" on mu vokaalne eneseväljendus muusika kaudu",
        socials: [
            {
                name: "Spotify",
                url: "https://spotify.com/aff",
                icon: "simple-icons:spotify"
            },
            {
                name: "Kontakt",
                url: "https://instagram.com/aff",
                icon: "material-symbols:alternate-email-rounded"
            }
        ],
        spotifyEmbed: "https://open.spotify.com/embed/track/3bRlTL0umvqlkqkgwkKGpz?utm_source=generator&theme=0",
        backgroundImage: "/afke.webp"
    },
    {
        alias: "supertrxshcxn",
        description: "supertrxshcxn on lahe.... SIGALAHE!",
        socials: [
            {
                name: "Spotify",
                url: "https://open.spotify.com/artist/3pi0tqZHNS8kXNGtviOX88",
                icon: "simple-icons:spotify"
            },
            {
                name: "YouTube",
                url: "https://youtube.com/supertrxshcxn",
                icon: "simple-icons:youtube"
            }
        ],
        spotifyEmbed: "https://open.spotify.com/embed/artist/3pi0tqZHNS8kXNGtviOX88?utm_source=generator&theme=0",
        backgroundImage: "/starr.webp"
    }
];