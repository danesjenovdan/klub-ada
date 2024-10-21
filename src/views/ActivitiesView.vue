<template>
    <main>
        <section class="title">
            <h1>Aktivnosti</h1>
        </section>

        <section class="row">
            <div class="card">
                <img src="@/assets/activities/mesecni-dogodki.jpg" alt="ZAKLJUČNI DOGODEK SEZONE">
                <div class="card-body">
                    <h3>Mesečni dogodki</h3>
                    <p>Na mesečnih srečanjih obravnavamo različne karierne in tehnične teme, govorimo o mehkih veščinah,
                        gostimo strokovnjakinje iz industrije ter se družimo in izmenjujemo ideje v sproščenem okolju ob
                        prigrizkih
                        in pijači.</p>
                </div>
            </div>

            <div class="card">
                <img src="@/assets/activities/coffee&&code.png" alt="ZAKLJUČNI DOGODEK SEZONE">
                <div class="card-body">
                    <h3>Coffee&&Code</h3>
                    <p>Coffee&&Code je serija neformalnih druženj ob kavi, kjer skupaj programiramo na projektih, ki si
                        jih vsaka
                        izbere sama. Lahko prineseš svojo domačo nalogo, osebni projekt, tutorial ali karkoli drugega,
                        na čemer
                        želiš delati. Poleg programiranja je to tudi priložnost za sproščeno debato, izmenjavo idej in
                        iskanje
                        motivacije za začetek ali nadaljevanje projekta.</p>
                </div>
            </div>

            <div class="card">
                <img src="@/assets/activities/discord.png" alt="ZAKLJUČNI DOGODEK SEZONE">
                <div class="card-body">
                    <h3>Discord skupnost</h3>
                    <p>Discord skupnost je varen prostor za komunikacijo, kjer izmenjujemo ideje, razpravljamo o
                        zanimivih temah,
                        delimo dogodke, uporabne vire in priložnosti za osebni ter karierni razvoj.</p>
                </div>
            </div>

            <div class="card">
                <img src="@/assets/activities/bookclub.jpg" alt="ZAKLJUČNI DOGODEK SEZONE">
                <div class="card-body">
                    <h3>Knjižni klub</h3>
                    <p>Knjižni klub je prostor za vse, ki poleg tehnologije uživamo tudi v branju in razpravah. Vsakih
                        nekaj
                        mesecev izberemo knjige, vezane na teme, kot so tehnologija, vloga žensk v družbi, osebnostna
                        rast in razvoj
                        kariere. Knjige, ki jih izbiramo, pogosto naslavljajo izzive, s katerimi se srečujemo kot ženske
                        v
                        tehnoloških poklicih, ali pa nas navdihujejo z zgodbami o moči, uspehu in spremembah.</p>
                </div>
            </div>

            <div class="card">
                <img src="@/assets/activities/novicnik.png" alt="ZAKLJUČNI DOGODEK SEZONE">
                <div class="card-body">
                    <h3>Novičnik</h3>
                    <p>Preko novičnika delimo aktualne informacije o prihajajočih dogodkih in naših drugih aktivnostih.
                        Prav tako
                        obveščamo o drugih zanimivih dogodkih in novostih iz sveta tehnologije.</p>
                </div>
            </div>
        </section>

    </main>
</template>

<script>
export default {
    data() {
        return {
            "menuOpen": false
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    max-width: 1160px;
    margin: 60px auto;

    p {
        font-size: 20px;
        margin-bottom: 20px;

        strong {
            font-weight: 700;
        }

        @media (min-width: 992px) {
            font-size: 28px;
        }
    }
}

// hr {
//   border: none;
//   border-bottom: 2px solid var(--color-red);
// }

.title {
    h1 {
        color: var(--color-red);
        text-align: center;
        font-weight: 700;
        font-size: 40px;

        @media (min-width: 992px) {
            font-size: 48px;
        }
    }

    h2 {
        color: var(--color-red);
        // text-align: center;
        font-weight: 700;
        font-size: 36px;
        margin-bottom: 30px;
    }
}

.next-event {
    display: flex;

    >div:first-child {
        img {
            max-width: 500px;
        }
    }

    >div:last-child {
        margin-left: 40px;
    }

    p.small {
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: 700;
    }

    h2 {
        font-weight: 700;
        color: var(--color-red);
        margin-bottom: 10px;
    }
}

.row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 32px;
    margin-bottom: 32px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
}

.card {
    width: 90%;
    background-color: var(--color-light);
    border: 2px solid var(--color-dark);
    border-radius: 8px;
    color: var(--color-dark);
    padding: 32px;

    @media (min-width: 768px) {
        width: 30%;
        align-self: stretch;
    }

    h3 {
        color: var(--color-dark);
        font-weight: 600;
        font-size: 24px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    img {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
        object-position: center;
    }

    p {
        font-size: 20px;
    }
}

footer {
    padding-top: 80px;
    padding-bottom: 40px;

    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 80px;
    }

    .newsletter {
        p {
            margin-bottom: 60px;
        }
    }

    .instagram {
        display: flex;
        flex-direction: column;
        justify-content: end;
        text-align: center;
        margin-top: 40px;

        @media (min-width: 992px) {
            text-align: end;
            margin-top: 0;
        }

        a {
            display: inline-block;
            margin-bottom: 20px;

            img {
                width: 40px;
            }
        }

        p {
            font-size: 18px;
            margin-bottom: 20px;

            a {
                color: var(--color-light);
                font-weight: 600;
            }
        }
    }
}
</style>
