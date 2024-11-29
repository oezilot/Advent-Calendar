/* MEINE LOGIC:
1. liste mit divs definieren der jedes eine id von 1-24 hat
2. aktuelle page als 1 initialisieren
3. das grid füllen mit aktueller page als bild b, aktuelle page-1(falls>1, dann wird das griditem leer gelassen) als bild a uns akutelle page+1 als bild c (if <25 dann wird das griditem leer gelassen)
4. grid updaten mit pagination: if  next-button clicked then aktuelle page+1, if prev-button clicked then aktuelle page -1
5. funktion zum buttons verdecken: if aktuellepage + 1 > 24 --> kein button angezeigt oder if aktuelle page -1 < 1 --> kein button angezeigt (also der button würde nur ausgeblendet)
*/

function resetAndScaleImage() {
    const imgB = document.getElementById('img-b');

    // Führe die Funktion nur aus, wenn die Bildschirmbreite ≤ 550px ist
    if (window.innerWidth <= 550) {
        // Setze die Skalierung auf 1 (normale Größe)
        imgB.style.transform = 'scale(1)';
        
        // Warte, bis der Skalierungs-Effekt beendet ist, bevor das Bild wieder skaliert wird
        setTimeout(() => {
            // Setze das Bild auf eine vergrößerte Größe (1.2x)
            imgB.style.transform = 'scale(1.2)';
        }, 400); // Warte 400ms, damit der Effekt sichtbar ist
    }
}


// Liste von 24 "divs" mit den IDs von 1 bis 24
const items = Array.from({ length: 24 }, (_, i) => ({ id: i + 1, text: i + 1 }));

// Aktuelle Seite initialisieren
let currentPage = 1;


// Funktion zum Setzen der Bilder im Grid und Aktualisieren der Seite
function updateGrid() {
    const imgA = document.getElementById('img-a');
    const imgB = document.getElementById('img-b');
    const imgC = document.getElementById('img-c');

    // Entferne die 'active' Klasse, um die Animation zurückzusetzen

    // Setze das Bild in der Mitte (img-b) auf das aktuelle Bild
    imgB.textContent = items[currentPage - 1].text;
    imgB.setAttribute('data-id', items[currentPage - 1].id); // ID von img-b
    setCarouselBackground(imgB, currentPage); // Hintergrundbild für img-b setzen

    // Fügt ein onclick-Event hinzu, das showAlert mit currentPage aufruft
    imgB.onclick = () => showAlert(currentPage, currentDay);

    // Setze das Bild auf der linken Seite (img-a) auf das vorherige Bild
    if (currentPage > 1) {
        imgA.textContent = items[currentPage - 2].text;
        imgA.setAttribute('data-id', items[currentPage - 2].id); // ID von img-a
        imgA.classList.remove('hidden'); // img-a sichtbar machen
        setCarouselBackground(imgA, currentPage - 1); // Hintergrundbild für img-a setzen
    } else {
        imgA.classList.add('hidden'); // img-a unsichtbar machen
    }

    // Setze das Bild auf der rechten Seite (img-c) auf das nächste Bild
    if (currentPage < 24) {
        imgC.textContent = items[currentPage].text;
        imgC.setAttribute('data-id', items[currentPage].id); // ID von img-c
        imgC.classList.remove('hidden'); // img-c sichtbar machen
        setCarouselBackground(imgC, currentPage + 1); // Hintergrundbild für img-c setzen
    } else {
        imgC.classList.add('hidden'); // img-c unsichtbar machen
    }

    // Füge die active Klasse hinzu, um den Übergang auszulösen
    imgB.classList.add("active");

    // Verstecke die Buttons, wenn keine Navigation mehr möglich ist
    togglePaginationButtons();
    updateSlider(); // Aktualisiere den Slider mit der aktuellen page
    
}

// Funktion zum Setzen des Hintergrundbildes für jedes Carousel-Item
function setCarouselBackground() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
        const itemId = parseInt(item.getAttribute('data-id')); // Hole die ID des Items

        // const backgroundImage = (currentDay > itemId) ? toerchenContent[itemId - 1].imageUrl : 'weihnachtskranz.png'; // Hintergrundbild setzen
        // item.style.backgroundImage = `url('${backgroundImage}')`;

        const backgroundImage = (currentDay > itemId) ? toerchenContent[itemId - 1].imageUrl: 'weihnachtskranz.png'; // Hintergrundbild setzen
        item.style.backgroundImage = `url('${backgroundImage}')`;


        // Finde den Paragraphen innerhalb des carousel-items
        const paragraph = item.querySelector('p'); 

        // Falls das heutige Törchen geöffnet werden kann
        if (currentDay === itemId) {
            // Rote Schrift für das heutige Törchen
            item.style.color = 'red'; 

            // Überprüfen, ob bereits ein Paragraph vorhanden ist
            if (!paragraph) {
                // Falls nicht, neuen Paragraphen hinzufügen
                const newParagraph = document.createElement('p');
                newParagraph.textContent = '';
                item.appendChild(newParagraph);
            } else {
                // Falls der Paragraph schon existiert, Text aktualisieren
                paragraph.textContent = '';
            }
        } else {
            // Für alle anderen Törchen zurücksetzen
            item.style.color = ''; // Farbe auf normal setzen
            if (paragraph) {
                paragraph.textContent = ''; // Text entfernen
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Stelle sicher, dass der aktuelle Tag festgelegt ist
    update_current_day();

    // Setze das Hintergrundbild für alle Carousel-Items
    setCarouselBackground();
});




// Funktion, um die Sichtbarkeit der Pagination-Buttons zu steuern
function togglePaginationButtons() {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');


    // Verstecke den "prev"-Button, wenn das erste Bild angezeigt wird
    prevButton.style.visibility = (currentPage > 1) ? 'visible' : 'hidden';

    // Verstecke den "next"-Button, wenn das letzte Bild angezeigt wird
    nextButton.style.visibility = (currentPage < 24) ? 'visible' : 'hidden';
}

// Funktion, um den Sliderwert mit der aktuellen Seite zu synchronisieren
function updateSlider() {
    const slider = document.getElementById('myRange');
    slider.value = currentPage; // Setze den Slider auf die aktuelle Seite
}


// pagination mit bildern und buttons
// Event Listener für den "Next"-Button
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < 24) {
        currentPage++;
        updateGrid();
        updateBackground();
    }
});
document.getElementById('img-c').addEventListener('click', () => {
    if (currentPage < 24) {
        currentPage++;
        updateGrid();
        updateBackground();
    }
});

// Event Listener für den "Prev"-Button
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateGrid();
        updateBackground();
    }
});
document.getElementById('img-a').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateGrid();
        updateBackground();
    }
});



// Event Listener für den Slider (Range Input)
document.getElementById('myRange').addEventListener('input', (event) => {
    currentPage = parseInt(event.target.value); // Setze die aktuelle Seite basierend auf dem Sliderwert
    updateGrid(); // Aktualisiere das Grid
});

// Funktion zum Setzen der initialen Seite
function initializeGrid() {
    // Setze die erste Seite
    currentPage = 1;

    // Setze die Bilder und aktualisiere die Anzeige
    updateGrid();
}

// Initialisiere das Grid
initializeGrid();




// ALERT-MESSAGE:
// datenbank simulieren
const toerchenContent = [
    { id: 1, imageUrl: '/Advent-Calendar/images/kevin_hoch.jpg', titel: 'Kevin Allein zu Haus', extra: 'Bastelidee des Tages: <br><a target="_blank" href="https://tutorials-raspberrypi.de/ueberwachung-von-fenstern-und-tueren-mit-dem-raspberry-pi">Baue dein eigenes Überwachungssystem mit einem RaspberryPi</a>', videoLink:'https://www.nanoo.tv/link/v/2212352 '},
    { id: 2, imageUrl: '/images/grinch_hoch.jpg', titel: 'Der Grinch', extra: 'Bastelidee des Tages: <br><a target="_blank" href="https://tutorials-raspberrypi.de/ueberwachung-von-fenstern-und-tueren-mit-dem-raspberry-pi">Adventzkranz zum Beginn der Adventszeit</a>', videoLink:'https://nanoo.tv/link/v/1905278' },
    { id: 3, imageUrl: '/images/kompass_hoch.jpg', titel: 'Der Goldene Kompass', extra: 'Fun Fact des Tages:<br>Dämonen wurden historisch als übernatürliche Wesen angesehen, die oft mit bösen Kräften verbunden waren und in vielen Kulturen als Verursacher von Krankheit, Unglück und moralischen Verfehlungen galten.', videoLink:'https://www.nanoo.tv/link/v/2101398' },
    { id: 4, imageUrl: '/images/geister_hoch.webp', titel: 'Die Geister, die ich rief', extra: 'Fun Fact des Tages:<br>In Europa glaubte man, dass Geister durch Spiegel erscheinen könnten, weshalb viele sie nachts abdeckten, um keine Seelen aus dem Jenseits anzulocken.', videoLink:'https://www.nanoo.tv/link/v/1368875' },

    { id: 5, imageUrl: '/images/love_hoch.jpg', titel: 'Love Actually', extra: 'Rezept des Tages:<br><a target="_blank" href="https://www.waseigenes.com/2015/12/07/spitzbuben-herzen-mit-johannisbeergelee/">Leckere Herzspitzbuben für deine Liebsten</a>', videoLink:'https://www.nanoo.tv/link/v/1910751' },
    { id: 6, imageUrl: '/images/santaclause_hoch.jpg', titel: 'Santa Clause', extra: 'Schicke dem Weihnachtsmann deine Wunschliste:<br><a target="_blank" href="https://www.post.ch/de/ueber-uns/aktuell/2023/wohin-mit-den-briefen-ans-christkind">Zum Postfach</a>', videoLink:'https://www.nanoo.tv/link/v/1921618' },
    { id: 7, imageUrl: '/images/aschenbroedel.jpg', titel: 'Drei Haselnüsse für Aschenbrödel', extra: 'Rezept des Tages:<br><a target="_blank" href="https://www.wildeisen.ch/rezepte/haselnusstorte">Aschenbrödels geliebte Haselnusstorte</a>', videoLink:'https://nanoo.tv/link/v/1911559' },
    { id: 8, imageUrl: '/images/santa2_hoch.webp', titel: 'Santa Clause 2', extra: 'Fun Fact des Tages:<br>Weihnachts-Elfen stammen ursprünglich aus nordischen und keltischen Mythen und wurden im 19. Jahrhundert durch Gedichte wie "A Visit from St. Nicholas" als fröhliche Helfer des Weihnachtsmanns populär.', videoLink:'https://www.nanoo.tv/link/v/465227' },

    { id: 9, imageUrl: '/images/holiday_hoch.jpg', titel: 'Frohe Weihnachten', extra: 'Fun Fact des Tages:<br>Der Film wurde in verschiedenen Orten wie Los Angeles und in den englischen Cotswolds gedreht.', videoLink:'https://www.nanoo.tv/link/v/2233215' },
    { id: 10, imageUrl: '/images/guardinas_hoch.jpg', titel: 'Rise of the Guardians', extra: 'Bastelidee des Tages:<br><a target="_blank" href="https://utopia.de/ratgeber/traumfaenger-basteln-ausfuehrliche-schritt-fuer-schritt-anleitung_292242/">Traumfänger für friedliche Träume</a>', videoLink:'https://www.nanoo.tv/link/v/1816712' },
    { id: 11, imageUrl: '/images/express_hoch.jpg', titel: 'Der Polarexpress', extra: 'Fun Fact des Tages:<br>Der Film wurde mit CGI-Technologie gemacht, die damals als revolutionär galt.', videoLink:'https://www.nanoo.tv/link/v/2201097' },
    { id: 12, imageUrl: '/images/lord_hoch.jpg', titel: 'Der kleine Lord', extra: 'Fun Fact des Tages:<br>Im mittelalterlichen England wurden junge Adlige oft schon im Kindesalter zu Lords ernannt, wobei sie in vielen Fällen eine Vormundschaft führten, bis sie das nötige Alter und die Erfahrung hatten, die Verantwortung selbst zu übernehmen.', videoLink:'https://nanoo.tv/link/v/326569' },
    
    { id: 13, imageUrl: '/images/charlie_hoch.jpg', titel: 'Charlie und die Schokoladenfabrik', extra: 'Rezept des Tages:<br><a target="_blank" href="https://bellevue.nzz.ch/kochen-geniessen/rezepte/dubai-schokolade-selber-machen-rezept-ld.1855806">Selbstgemachte Dubai-Schokolade</a>', videoLink:'https://www.nanoo.tv/link/v/1866139' },
    { id: 14, imageUrl: '/images/manhatten_hoch.webp', titel: 'Das Wunder von Manhattan', extra: 'Fun Fact des Tages:<br>Der Film gewann 3 Academy Awards und wurde als einer der besten Weihnachtsfilme aller Zeiten bezeichnet.', videoLink:'https://www.nanoo.tv/link/v/2211088' },
    { id: 15, imageUrl: '/images/frozen_hoch.jpg', titel: 'Die Eiskönigin', extra: 'Fun Fact des Tages:<br>"Let It Go" war ursprünglich nicht als Song für Elsa gedacht, sondern für eine andere Figur im Film, bevor es zu dem weltweiten Hit wurde.', videoLink:'https://www.nanoo.tv/link/v/1628671' },
    { id: 16, imageUrl: '/images/last_hoch.jpg', titel: 'Last Christmas', extra: 'Fun Fact des Tages:<br>Der Film basiert auf dem gleichnamigen Song von Wham! aus den 80er Jahren.', videoLink:'https://www.nanoo.tv/link/v/2202164' },
    
    { id: 17, imageUrl: '/images/krone_hoch.webp', titel: 'Ein Herz und eine Krone', extra: 'Fun Fact des Tages:<br>Dieser romantische Weihnachtsfilm wurde in nur 18 Tagen gedreht und hat trotzdem eine tiefe emotionale Wirkung.', videoLink:'https://nanoo.tv/link/v/702377 ' },
    { id: 18, imageUrl: '/images/nussknacker_hoch.jpg', titel: 'Der Nussknacker', extra: 'Fun Fact des Tages:<br>Das "Nussknacker-Ballett" heißt so, weil die zentrale Figur ein Nussknacker-Spielzeug ist, das im Märchen von E.T.A. Hoffmann zum Leben erwacht und Clara auf ein magisches Abenteuer führt.', videoLink:'https://nanoo.tv/link/v/34205' },
    { id: 19, imageUrl: '/images/bad_hoch.jpg', titel: 'Bad Santa ', extra: 'Fun Fact des Tages:<br>"Bad Santa" war einer der ersten Weihnachtsfilme, die den Weihnachtsmann als unangepassten und vulgären Charakter darstellten.', videoLink:'https://nanoo.tv/link/v/968620 ' },
    { id: 20, imageUrl: '/images/stone_hoch.jpg', titel: 'Die Familie Stone', extra: 'Rezept des Tages:<br><a target="_blank" href="https://www.food.com/recipe/morton-family-strata-from-the-family-stone-movie-329652">Familienrezept der Stones</a>', videoLink:'https://www.nanoo.tv/link/v/782192' },

    { id: 21, imageUrl: '/images/schneekoenigin_hoch.webp', titel: 'Die Schneekönigin', extra: 'Bastelidee des Tages:<br><a target="_blank" href="https://famigros.migros.ch/de/ausfluege-und-freizeit/basteln/schneeflocken-scherenschnitt">Schneeflocken-Scherenschnitt</a>', videoLink:'https://www.nanoo.tv/link/v/940548' },
    { id: 22, imageUrl: '/images/nightmare_hoch.jpg', titel: 'Nightmare Before Christmas', extra: 'Fun Fact des Tages:<br>Der Film ist berühmt für seine Stop-Motion-Animation und wurde von Tim Burton produziert, obwohl er nicht der Regisseur war.', videoLink:'https://nanoo.tv/link/v/799061' },
    { id: 23, imageUrl: '/images/carol_hoch.jpg', titel: 'Eine Weihnachtsgeschichte', extra: 'Rezept des Tages:<br><a target="_blank" href="https://www.einfachbacken.de/rezepte/zimtsterne-klassisches-rezept">Klassische Zimtsterne</a>', videoLink:'https://nanoo.tv/link/v/914913' },
    { id: 24, imageUrl: '/images/beschehrung.jpg', titel: 'Schöne Bescherung', extra: 'Bastelidee des Tages: <br><a target="_blank" href="https://www.geo.de/geolino/basteln/7711-rtkl-bastelanleitungen-weihnachts-lichterketten">Lichterketten für eine gemütliche Stimmung</a>', videoLink:'https://www.nanoo.tv/link/v/1910751'}

];

// Function to show the custom alert
function showAlert(current_page, current_day) {
    update_current_day();
    // nur die törchen der bereits vergangenen tagen kann man öffnen!
    if (current_page <= current_day) {
        // Finde das Törchen mit der entsprechenden ID (die funktion mit den daten für das törchen machen welches die id hat die man als argument gibt)
        const tor = toerchenContent.find(item => item.id === current_page);

        // Wenn das Törchen nicht gefunden wurde, abbrechen
        if (!tor) {
            console.error('Törchen nicht gefunden!');
            return;
        }
        const alertBox = document.getElementById('customAlert');
        // verchiedene componenten des alerts definieren
        const titelMessage = document.getElementById('titelMessage');
        const imgMessage = document.getElementById('imgMessage');
        const extraMessage = document.getElementById('extraMessage');
        const linkmessage = document.getElementById('linkMessage');

        // Set the titel, image, extra and link depending on the id of the onclicked div
        titelMessage.textContent = tor.titel;
        imgMessage.src = tor.imageUrl;
        extraMessage.innerHTML = tor.extra;
        linkmessage.href = tor.videoLink;

        // Display the alert box
        alertBox.classList.add('show');

        console.log(`du hast gerade auf das ${current_page}te törchen geklckt!`)
            }
    else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.add('show');

        document.getElementById('errorMessage').textContent = `Heute ist Tag ${current_day}, dieses Törchen kann erst am ${current_page}. geöffnet werden!`

        console.log(`Aktueller Tag: ${current_day}`)
    }  
}

// Function to close the custom alert
function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    const errorMessage = document.getElementById('error-message');

    // Hide the alert box
    alertBox.classList.remove('show');
    errorMessage.classList.remove('show');
}

// TIME MANAGEMENT: nur die Törchen können geöffnet werden welche mind. so gross sind wie der current day
var currentDay = 0;
var currentMonth = 0;

function update_current_day() {
    currentDate = new Date();
    currentDay = currentDate.getDate();
    currentMonth = currentDate.getMonth();

    if (currentMonth < 12) {
        currentDay = 0;
    }
    if (currentMonth < 2) {
        currentDay = 25;
    }
    else {
        currentDay = currentDay;
    }

    console.log('Aktueller Tag: ', currentDay)
    console.log('Aktueller Monat: ', currentMonth)

}
update_current_day();
// der tag müsste immer um 24.00 upgedated werden weil dan ein neuer tag anbricht!



// Rote Farbe des Sliders updaten mit der current_page
const range = document.getElementById("myRange");

function updateBackground() {
  const value = range.value; // Aktueller Wert des Reglers
  const percentage = ((value - range.min) / (range.max - range.min)) * 100; // Prozentsatz berechnen

  // Dynamische Farbänderung des Tracks
  range.style.background = `linear-gradient(to right, red ${percentage}%, white ${percentage}%)`;
}

// Hintergrundfarbe beim Laden der Seite initialisieren
updateBackground();

// Event Listener: Hintergrund aktualisieren, wenn der Regler verschoben wird
range.addEventListener("input", updateBackground);