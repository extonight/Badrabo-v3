# Badrabo-projekt

Badrabo är en fastighetsplattform inspirerad av bostadssajter som Hemnet och Booli. Webbplatsen är byggd med semantisk HTML5 och modern CSS3 utan JavaScript.
Syftet är att visa lediga bostäder i ett responsivt grid, med ett fokus på tydlig navigering, tillgänglighet och ren design.
Projektet består av tre sidor:

Start (index.html) — bostadslista med bilder och priser.

utforska.html — om oss sida.

Mina sidor / Inloggning — enkel inloggningssida.

Vitt, ljusgrått (#f5f5f5) och accentfärgerna turkos (#0097b2) och orange (#ff6f00).
→ Ger ett fräscht, professionellt och tillgängligt intryck med bra kontrast.

Typografi:
Archivo Black för logotyp/rubriker (ger tydlig profil).
Roboto för brödtext (lättläst och modern).

Layout:
Header och footer fixerade och konsekventa på alla sidor.
CSS Grid används för bostadsannonserna i main.
Flexbox används i header, footer och sidomeny men också i själva annonserna.

Responsivitet:
Mobil-först-strategi med brytpunkter vid 899px.
Sökfält och knappar krymper eller döljs vid små skärmar.
Sidomeny och footer justerar sig automatiskt via flex-wrap.
Hamburgermeny: byggd med checkbox-hack (input[type=checkbox] + label + aside) som öppnar sidomenyn.

CSS-mönster för interaktivitet:
Hover-effekter: på kort, länkar och ikoner med :hover och :active funktioner.
Tooltip: enkel position: absolute som dyker upp med hjälp av :hover.
Lazy loading: bilder har loading="lazy" för bättre prestanda.

Kända begränsningar:
Sökrutan är endast visuellt responsiv (ingen riktig sökfunktion).
Sidomenyn stängs inte automatiskt vid klick utanför (CSS-begränsning).
Inga riktiga formulärvalideringar ännu.

Förbättringsidéer:
Koppla riktiga bostadsdata via ett API exempelvis Hemnet-öppet data.
Implementera ljus/mörkt läge med CSS-variabler.
Lägga till :target baserad modal för visning av en bostadsannons.
Finslipa typografisk skala och spacing via ett litet designsystem.


