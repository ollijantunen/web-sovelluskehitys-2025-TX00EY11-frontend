##### Luo kansio ssh:n välityksellä
ssh -i avain käyttäjänimi@osoite 'cd olemassa-oleva-kansio1/olemassa-oleva-kansio2 && mkdir uusi-kansio'

##### Siirrä tiedosto scp:llä
scp -i avain esimerkki.html käyttäjänimi@osoite:olemassa-oleva-kansio1/olemassa-oleva-kansio2/

##### Siirrä kansio scp:llä
scp -r -i avain kansio/ käyttäjänimi@osoite:olemassa-oleva-kansio1/olemassa-oleva-kansio2/