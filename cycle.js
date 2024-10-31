class HypeCycle {
    constructor() {
      this.technologies = [];
      this.stages = [
        "Innovation Trigger",
        "Peak of Inflated Expectations",
        "Trough of Disillusionment",
        "Slope of Enlightenment",
        "Plateau of Productivity"
      ];
    }
  
    addTechnology(name, stage, expectation) {
      this.technologies.push({ name, stage, expectation });
    }
  
    visualize() {
      console.log("Hype Cycle Visualization");
      console.log("========================");
  
      const maxNameLength = Math.max(...this.technologies.map(t => t.name.length));
      const maxStageLength = Math.max(...this.stages.map(s => s.length));
  
      this.technologies.forEach(tech => {
        const stageIndex = this.stages.indexOf(tech.stage);
        const hypeLevel = "█".repeat(tech.expectation);
        const padding = " ".repeat(maxNameLength - tech.name.length);
        const stagePadding = " ".repeat(maxStageLength - tech.stage.length);
  
        console.log(`${tech.name}${padding} | ${tech.stage}${stagePadding} | ${hypeLevel} (${tech.expectation})`);
      });
    }
  
    analyzeMaturity() {
      console.log("\nTechnology Maturity Analysis");
      console.log("============================");
  
      this.stages.forEach(stage => {
        const techsInStage = this.technologies.filter(t => t.stage === stage);
        console.log(`${stage}:`);
        if (techsInStage.length === 0) {
          console.log("  No technologies in this stage");
        } else {
          techsInStage.forEach(tech => {
            console.log(`  - ${tech.name} (Hype Level: ${tech.expectation})`);
          });
        }
      });
    }
  }
  
  // Create a new Hype Cycle
  const hypeCycle = new HypeCycle();
  
  // Add technologies at different stages of the Hype Cycle
  hypeCycle.addTechnology("Artificial Intelligence", "Peak of Inflated Expectations", 9);
  hypeCycle.addTechnology("Blockchain", "Trough of Disillusionment", 5);
  hypeCycle.addTechnology("Internet of Things", "Slope of Enlightenment", 7);
  hypeCycle.addTechnology("5G", "Innovation Trigger", 8);
  hypeCycle.addTechnology("Virtual Reality", "Plateau of Productivity", 6);
  hypeCycle.addTechnology("Quantum Computing", "Innovation Trigger", 9);
  
  // Visualize the Hype Cycle
  hypeCycle.visualize();
  
  // Analyze technology maturity
  hypeCycle.analyzeMaturity();