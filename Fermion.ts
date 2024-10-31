enum Fermion {
    // Quarks
    UpQuark = "First generation quark with charge +2/3",
    DownQuark = "First generation quark with charge -1/3",
    CharmQuark = "Second generation quark with charge +2/3",
    StrangeQuark = "Second generation quark with charge -1/3",
    TopQuark = "Third generation quark with charge +2/3",
    BottomQuark = "Third generation quark with charge -1/3",
  
    // Leptons
    Electron = "First generation charged lepton",
    ElectronNeutrino = "First generation neutrino",
    Muon = "Second generation charged lepton",
    MuonNeutrino = "Second generation neutrino",
    Tau = "Third generation charged lepton",
    TauNeutrino = "Third generation neutrino",
  
    // Antiparticles
    AntiUpQuark = "Antiparticle of the up quark",
    AntiDownQuark = "Antiparticle of the down quark",
    AntiCharmQuark = "Antiparticle of the charm quark",
    AntiStrangeQuark = "Antiparticle of the strange quark",
    AntiTopQuark = "Antiparticle of the top quark",
    AntiBottomQuark = "Antiparticle of the bottom quark",
    Positron = "Antiparticle of the electron",
    AntiMuon = "Antiparticle of the muon",
    AntiTau = "Antiparticle of the tau",
  
    // Hypothetical supersymmetric partners (examples)
    Gluino = "Hypothetical supersymmetric partner of the gluon",
    Photino = "Hypothetical supersymmetric partner of the photon",
    Gravitino = "Hypothetical supersymmetric partner of the graviton"
  }
  
  // Function to get information about a fermion
  function getFermionInfo(fermion: Fermion): string {
    return Fermion[fermion];
  }
  
  // Example usage
  console.log("Up Quark:", getFermionInfo(Fermion.UpQuark));
  console.log("Electron:", getFermionInfo(Fermion.Electron));
  console.log("Gluino:", getFermionInfo(Fermion.Gluino));
  
  // Function to group fermions by type
  function groupFermions(): { [key: string]: Fermion[] } {
    return {
      Quarks: [
        Fermion.UpQuark,
        Fermion.DownQuark,
        Fermion.CharmQuark,
        Fermion.StrangeQuark,
        Fermion.TopQuark,
        Fermion.BottomQuark
      ],
      Leptons: [
        Fermion.Electron,
        Fermion.ElectronNeutrino,
        Fermion.Muon,
        Fermion.MuonNeutrino,
        Fermion.Tau,
        Fermion.TauNeutrino
      ],
      Antiparticles: [
        Fermion.AntiUpQuark,
        Fermion.AntiDownQuark,
        Fermion.AntiCharmQuark,
        Fermion.AntiStrangeQuark,
        Fermion.AntiTopQuark,
        Fermion.AntiBottomQuark,
        Fermion.Positron,
        Fermion.AntiMuon,
        Fermion.AntiTau
      ],
      Supersymmetric: [
        Fermion.Gluino,
        Fermion.Photino,
        Fermion.Gravitino
      ]
    };
  }
  
  // Example usage of grouping
  const groupedFermions = groupFermions();
  console.log("Quarks:", groupedFermions.Quarks.map(q => Fermion[q]).join(", "));
  console.log("Leptons:", groupedFermions.Leptons.map(l => Fermion[l]).join(", "));