# CRM Application - Client & Invoice Management

**CRM Application** je sveobuhvatna full-stack platforma za upravljanje klijentima i fakturisanjem razvijena korišćenjem React-a na frontendu i Laravel-a na backend-u. Naš cilj je da pojednostavimo i automatizujemo proces upravljanja poslovnim odnosima sa klijentima — od registracije i autentifikacije korisnika, preko kompleksnog upravljanja klijentskim podacima, do kreiranja i praćenja faktura u realnom vremenu.

## Frontend arhitektura

Frontend čini **React 18** SPA (single-page application) u kome za navigaciju koristimo **React Router**, za HTTP komunikaciju **Axios**, a za stilizovanje **Tailwind CSS**. UI smo podelili na modularne komponente koje imaju jasno definisane odgovornosti. Stanje aplikacije održavamo korišćenjem **Context API** i React hook-ova (`useState`, `useEffect`), što omogućava efikasno upravljanje globalnim stanjem kroz celu aplikaciju.

Autentifikacija se bazira na token sistemu gde se korisničke informacije i uloge (`Admin`, `User`, `Client`) čuvaju u sessionStorage, omogućavajući očuvanje sesije i nakon osvežavanja stranice. Aplikacija podržava tri različite uloge sa specifičnim pristupnim nivoima i funkcionalnostima.

UI dizajn prati savremene standarde responzivnog web dizajna, koristeći Tailwind CSS utility klase za brzu i konzistentnu stilizaciju. Dashboard sekcija pruža pregled ključnih metrika i nedavnih aktivnosti, dok je cela aplikacija optimizovana za mobilne uređaje.

## Backend i API

Na serverskoj strani, koristimo **Laravel 10** sa **PHP 8.1+** i **Laravel Sanctum** paketom za API token autentifikaciju. RESTful API dizajn omogućava jasnu komunikaciju između frontend i backend slojeva. Kontroleri implementiraju standardne CRUD operacije (`index`, `show`, `store`, `update`, `destroy`) za sve glavne entitete sistema.

**Eloquent ORM** se koristi za sve operacije sa bazom podataka, omogućavajući elegantno mapiranje objekata i relacionih struktura. **MySQL** baza podataka čuva sve poslovne podatke, dok migracije obezbeđuju konzistentnu strukturu baze kroz različite okruženja.

Role-based access control sistem implementiran je kroz policy klase i middleware, osiguravajući da korisnici pristupaju samo resursima za koje imaju odgovarajuće dozvole.

## Ključne funkcionalnosti

### **Role-Based Permission System**
* **Admin** - Potpun pristup sistemu: upravljanje korisnicima, klijentima i fakturama, pristup dashboard metrikama i sistemskim konfiguracijama
* **User** - Standardni korisnik: kreiranje i upravljanje klijentima, kreiranje faktura, pregled sopstvenih aktivnosti
* **Client** - Ograničen pristup: pregled sopstvenih faktura i osnovnih informacija

### **Client Management System**
Kompletan CRUD sistem za upravljanje klijentskim podacima sa mogućnostima pretraživanja, filtriranja i sortiranja. Korisnici mogu da dodaju nove klijente, ažuriraju postojeće informacije i prate istoriju svih transakcija vezanih za određenog klijenta.

### **Invoice Management & Auto-numbering**
Napredno fakturisanje sa automatskim generisanjem brojeva faktura, mogućnostima kreiranja, editovanja i brisanja faktura. Sistem automatski prati status faktura i omogućava export u različite formate.

### **Real-time Dashboard**
Interaktivni dashboard sa ključnim metrikama, grafičkim prikazima performance-a i real-time ažuriranjima podataka. Dashboard se prilagođava ulozi korisnika i prikazuje relevantne informacije.

### **Live Data Synchronization**
Real-time sinhronizacija podataka između frontend i backend komponenti omogućava trenutno ažuriranje informacija bez potrebe za osvežavanjem stranice.

## Technology Stack

**Frontend:**
- React 18 sa Hook-ovima
- React Router za SPA navigaciju
- Axios za HTTP komunikaciju
- Tailwind CSS za responzivno stilizovanje
- Context API za globalno upravljanje stanjem

**Backend:**
- Laravel 10 (PHP 8.1+)
- MySQL relacijska baza podataka
- Laravel Sanctum za API autentifikaciju
- Eloquent ORM za operacije sa bazom
- RESTful API arhitektura

## Instalacija i pokretanje

### Prerequisites
Preporučene verzije:
- Node.js (v16 ili viša)
- npm ili yarn
- PHP 8.1+
- Composer
- MySQL

### Backend Setup (Laravel)

1. **Klonirajte repozitorijum:**
```bash
git clone https://github.com/username/crm-application.git
cd crm-application
```

2. **Instalirajte PHP dependency-je:**
```bash
composer install
```

3. **Konfigurišite environment:**
```bash
cp .env.example .env
```

4. **Podesite database konekciju u .env fajlu:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crm_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. **Generirajte application key i pokrenite migracije:**
```bash
php artisan key:generate
php artisan migrate
php artisan db:seed
```

6. **Pokrenite Laravel development server:**
```bash
php artisan serve
```
Backend API dostupan na: http://localhost:8000

### Frontend Setup (React)

1. **Navigirajte u frontend direktorijum:**
```bash
cd frontend
```

2. **Instalirajte Node.js dependency-je:**
```bash
npm install
```

3. **Konfigurišite API URL:**
```bash
cp .env.example .env
```

```env
REACT_APP_API_URL=http://localhost:8000/api
```

4. **Pokrenite React development server:**
```bash
npm start
```
Frontend aplikacija dostupna na: http://localhost:3000

## API Endpoints

### **Authentication**
- `POST /api/register` - Registracija novog korisnika
- `POST /api/login` - Prijava korisnika
- `POST /api/logout` - Odjava korisnika
- `GET /api/me` - Informacije o trenutnom korisniku

### **Clients Management**
- `GET /api/clients` - Lista svih klijenata
- `POST /api/clients` - Kreiranje novog klijenta
- `GET /api/clients/{id}` - Detalji određenog klijenta
- `PUT /api/clients/{id}` - Ažuriranje klijenta
- `DELETE /api/clients/{id}` - Brisanje klijenta

### **Invoices Management**
- `GET /api/invoices` - Lista svih faktura
- `POST /api/invoices` - Kreiranje nove fakture
- `GET /api/invoices/{id}` - Detalji određene fakture
- `PUT /api/invoices/{id}` - Ažuriranje fakture
- `DELETE /api/invoices/{id}` - Brisanje fakture

## Default User Accounts

Posle seedovanja baze podataka, možete koristiti sledeće default naloge:

- **Admin:** `admin@example.com` / `password`
- **User:** `user@example.com` / `password`  
- **Client:** `client@example.com` / `password`

## Project Structure

```
crm-application/
├── app/
│   ├── Http/Controllers/    # API kontroleri
│   ├── Models/             # Eloquent modeli
│   ├── Policies/           # Autorizacioni policy-ji
│   └── Resources/          # JSON resursi
├── database/
│   ├── migrations/         # Database migracije
│   └── seeders/           # Database seederi
├── routes/
│   └── api.php            # API rute
├── frontend/
│   ├── src/
│   │   ├── components/    # React komponente
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Stranice aplikacije
│   │   └── services/      # API servisi
│   └── public/
└── README.md
```

## Contributing

1. Fork-ujte repozitorijum
2. Kreirajte feature branch (`git checkout -b feature/amazing-feature`)
3. Commit-ujte promene (`git commit -m 'Add some amazing feature'`)
4. Push-ujte na branch (`git push origin feature/amazing-feature`)
5. Otvorite Pull Request
