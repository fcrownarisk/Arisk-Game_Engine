enum Boson {
    Graviton = "Hypothetical particle that mediates the force of gravity",
    Photon = "Mediates the electromagnetic force",
    Gluon = "Mediates the strong nuclear force",
    WBoson = "Mediates the weak nuclear force (charged)",
    ZBoson = "Mediates the weak nuclear force (neutral)",
    HiggsBoson = "Gives mass to other particles",
    Dilaton = "Hypothetical particle related to the size of strings",
    Tachyon = "Hypothetical particle that moves faster than light"
  }
  
  // Function to get information about a boson
  function getBosonInfo(boson: Boson): string {
    return Boson[boson];
  }
  
  // Example usage
  console.log("Graviton:", getBosonInfo(Boson.Graviton));
  console.log("Photon:", getBosonInfo(Boson.Photon));
  console.log("Higgs Boson:", getBosonInfo(Boson.HiggsBoson));