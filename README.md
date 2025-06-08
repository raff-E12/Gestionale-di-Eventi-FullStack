# Sistema Di Gestione Di Eventi

## Descrizione

Questo progetto è una **applicazione per organizzare eventi**, con funzionalità per la gestione di utenti, eventi e prenotazioni.

L’obiettivo è esercitarsi e approfondire concetti di backend, frontend, autenticazione, sicurezza e gestione dati tramite database relazionale.

Il progetto è stato sviluppato in due fasi:
- **Build**: bozza funzionante per definire la struttura di base.
- **Versione organizzata**: separazione frontend/backend, miglioramento dell’architettura e delle funzionalità.

Sono previste ulteriori versioni con nuove funzionalità e ottimizzazioni.

---

## Funzionalità principali

- **Gestione utenti**: registrazione, login sicuro, gestione profilo.
- **Gestione eventi**: creazione, modifica, visualizzazione eventi.
- **Prenotazioni**: iscrizione/cancellazione agli eventi.
- **Calendario interattivo**: visualizzazione eventi tramite FullCalendar.
- **Autenticazione JWT**: sicurezza delle sessioni utente.
- **Hashing password con bcrypt**.
- **Database MySQL**: gestione relazioni utenti-eventi.

---

## Tecnologie utilizzate

- **Backend**: Node.js, Express
- **Frontend**: React, FullCalendar
- **Database**: MySQL
- **Altre librerie**: bcrypt, jsonwebtoken

---

## Struttura progetto

```
/backend
  |-- src/
  |-- package.json
  |-- .env

/frontend
  |-- src/
  |-- package.json
  |-- .env
```

---

## Come inizializzare il progetto

### 1. Clona la repository

```bash
git clone <url-del-repo>
cd <nome-cartella-repo>
```

---

### 2. Backend (Node.js + Express)

#### a. Entra nella cartella backend

```bash
cd backend
```

#### b. Installa le dipendenze

```bash
npm install
```

#### c. Configura l’ambiente

Crea un file `.env` nella cartella `/backend` con le seguenti variabili (modifica secondo le tue impostazioni):

```
DB_HOST=localhost
DB_USER=tuo_utente_mysql
DB_PASSWORD=tuapassword
DB_NAME=nome_database
JWT_SECRET=supersegreto
```

#### d. Avvia il backend

```bash
npm run dev
```
*(Oppure `npm start` a seconda dello script presente)*

---

### 3. Frontend (React + FullCalendar)

#### a. Entra nella cartella frontend

```bash
cd ../frontend
```

#### b. Installa le dipendenze

```bash
npm install
```

#### c. Avvia il frontend

```bash
npm start
```

---

### 4. Configurazione FullCalendar

FullCalendar sarà integrato sul frontend per la visualizzazione degli eventi.
Consulta la [documentazione ufficiale](https://fullcalendar.io/docs/react) per eventuali personalizzazioni.

---

## Dipendenze principali

### Backend

- express
- mysql2
- bcrypt
- jsonwebtoken
- dotenv
- cors

### Frontend

- react
- @fullcalendar/react
- @fullcalendar/daygrid
- axios

---

## Note aggiuntive

- **Sicurezza**: Le password vengono salvate solo in forma cifrata (bcrypt).
- **Autenticazione**: L’accesso alle funzionalità protette avviene tramite JWT.
- **Scalabilità**: La struttura facilita l’estensione a nuove funzionalità.

---

## Roadmap futura

- Refactoring e miglioramento UI/UX
- Notifiche email
- Export eventi
- Gestione ruoli (organizzatore/partecipante)
- Statistiche eventi

---

## Autore

Progetto sperimentale creato per esercitazione e apprendimento.

---