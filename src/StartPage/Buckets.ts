import { Bucket } from "../Types";

export const createRikaTillsammansBuckets = (expenses: number): Bucket[] => {
  const buffertHinken: Bucket = createBucket("Bufferthinken", "Låg risk.");
  const mellanriskHinken: Bucket = createBucket(
    "Mellanriskhinken",
    "Mellan risk. \nMål motsvarar 7 gånger bufferthinken."
  );
  const passivHinken: Bucket = createBucket(
    "Passivhinken",
    "Hög risk. \nMål motsvarar 25 gånger nödvändiga utgifter."
  );
  const lekHinken = createBucket(
    "Lekhinken",
    "Mycket hög risk. \nMål motsvarar 10% av passivhinken."
  );

  buffertHinken.horizon = { from: 0, to: 3 };
  mellanriskHinken.horizon = { from: 4, to: 10 };
  passivHinken.horizon = { from: 10, to: 20 };
  lekHinken.horizon = { from: 10, to: 50 };

  // All quotes from https://rikatillsammans.se/fyra-hinkar-strategin/

  //""
  //Storleken på den här hinken ska vara 12 månaders utgifter minus alla garanterade inkomster under året.
  //Bufferthinken bör innehålla alla stora utgifter de kommande 0 – 36 månaderna såsom t.ex. sparande till en kontantinsats, pengar till skatt eller liknande.
  //""
  buffertHinken.wantedAmount = expenses;

  //""
  //Storleksmässigt bör mellanriskhinken vara ganska stor, gärna 3 – 7 gånger bufferthinkens storlek
  //med minst 1-2 årsutgifter i fritt kapital såsom fonder, fondrobot eller motsvarande.
  //""
  mellanriskHinken.wantedAmount = buffertHinken.wantedAmount * 7;

  //""
  // Över tid kommer sannolikt den passiva hinken bli den största delen i ditt sparande även om det är den minsta när du börjar.
  //Storleksmässigt bör du sikta efter att den ska bli så stor så att den kan finansiera den livsstil som du önskar.
  //En bra tumregel är 25 gånger dina årsutgifter.
  //""
  passivHinken.wantedAmount = expenses * 25;

  //""
  //Syftet med den här hinken är således inte primärt att tjäna pengar utan snarare att tillfredsställa de andra
  // känslomässiga behov som kan finnas med ett sparande.
  //Därför begränsar vi också storleken på den här hinken till
  // att maximalt vara 10 procent av den passiva hinken.
  //""
  lekHinken.wantedAmount = passivHinken.wantedAmount * 0.1;

  return [buffertHinken, mellanriskHinken, passivHinken, lekHinken];
};

const createBucket = (name: string, description: string): Bucket => ({
  id: window.crypto.getRandomValues(new Uint32Array(1))[0],
  name,
  description,
  contents: [],
  horizon: {
    from: 0,
    to: 0,
  },
  wantedAmount: 0,
});
