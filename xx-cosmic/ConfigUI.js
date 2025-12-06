class ConfigUI {
    constructor(stageConfig, resetCallback, startFromStageCallback) {
        this.stageConfig = stageConfig;
        this.resetCallback = resetCallback;
        this.startFromStageCallback = startFromStageCallback;
        this.panelVisible = false;
        this.button = null;
        this.panel = null;
        this.playButton = null;
        this.inputs = {};
        this.showButtonThreshold = 100; // Show button when mouse is within 100px from top
    }

    init() {
        // Load saved config from localStorage
        this.loadConfigFromStorage();
        
        // Create toggle button
        if (!this.button) {
            this.button = createButton("⚙");
            this.button.position(windowWidth - 50, 10);
            this.button.size(40, 40);
            this.button.style("background-color", "#3c3c3c");
            this.button.style("color", "#c8c8c8");
            this.button.style("border", "1px solid #969696");
            this.button.style("border-radius", "5px");
            this.button.style("font-size", "20px");
            this.button.style("cursor", "pointer");
            this.button.style("transition", "background-color 0.2s, opacity 0.3s");
            this.button.style("opacity", "0");
            this.button.style("pointer-events", "none");
            this.button.mouseOver(() => {
                this.button.style("background-color", "#646464");
            });
            this.button.mouseOut(() => {
                this.button.style("background-color", "#3c3c3c");
            });
            this.button.mousePressed(() => {
                this.panelVisible = !this.panelVisible;
                this.updatePanelVisibility();
            });
        }
        
        // Create panel container
        if (!this.panel) {
            this.panel = createDiv();
            this.panel.style("position", "absolute");
            this.panel.style("background-color", "rgba(40, 40, 40, 0.9)");
            this.panel.style("border", "2px solid #646464");
            this.panel.style("border-radius", "8px");
            this.panel.style("padding", "15px");
            this.panel.style("width", "280px");
            this.panel.style("font-family", "monospace");
            this.panel.style("z-index", "1000");
            
            // Panel title
            const title = createElement("h3", "Stage Configuration");
            title.parent(this.panel);
            title.style("margin", "0 0 15px 0");
            title.style("color", "#c8c8c8");
            title.style("font-size", "14px");
            title.style("font-weight", "normal");
            
            // Create play button
            this.createPlayButton();
            
            // Create input elements
            this.createInputs();
        }
        
        this.updatePanelPosition();
        this.updatePanelVisibility();
        this.updateInputValues();
    }

    updatePanelPosition() {
        if (this.button) {
            this.button.position(windowWidth - 50, 10);
        }
        if (this.panel) {
            // Position panel further left to ensure it's fully visible
            this.panel.position(windowWidth - 320, 60);
        }
    }

    updatePanelVisibility() {
        if (this.panel) {
            this.panel.style("display", this.panelVisible ? "block" : "none");
        }
        // Keep button visible when panel is open
        this.updateButtonVisibility();
    }

    updateButtonVisibility() {
        if (!this.button) return;
        
        // Show button if panel is open or mouse is near top
        const shouldShow = this.panelVisible || (typeof mouseY !== 'undefined' && mouseY <= this.showButtonThreshold);
        
        if (shouldShow) {
            this.button.style("opacity", "1");
            this.button.style("pointer-events", "auto");
        } else {
            this.button.style("opacity", "0");
            this.button.style("pointer-events", "none");
        }
    }

    render() {
        // Update button visibility based on mouse position
        this.updateButtonVisibility();
    }

    createPlayButton() {
        this.playButton = createButton("▶ Play");
        this.playButton.parent(this.panel);
        this.playButton.style("display", "block");
        this.playButton.style("width", "100%");
        this.playButton.style("padding", "8px");
        this.playButton.style("margin-bottom", "15px");
        this.playButton.style("background-color", "#4a7c59");
        this.playButton.style("color", "#ffffff");
        this.playButton.style("border", "none");
        this.playButton.style("border-radius", "4px");
        this.playButton.style("font-size", "12px");
        this.playButton.style("font-family", "monospace");
        this.playButton.style("cursor", "pointer");
        this.playButton.style("transition", "background-color 0.2s");
        this.playButton.mouseOver(() => {
            this.playButton.style("background-color", "#5a9c69");
        });
        this.playButton.mouseOut(() => {
            this.playButton.style("background-color", "#4a7c59");
        });
        this.playButton.mousePressed(() => {
            if (this.resetCallback) {
                this.resetCallback();
            }
        });
    }

    createInputs() {
        // Create input for each config value
        const configs = [
            { key: "delayBeforeAppear", label: "Delay Before Appear (seconds)", stage: 0 },
            { key: "timeToFirstTarget", label: "Time to First Target (seconds)", stage: 1 },
            { key: "stayAtFirstTarget", label: "Stay at First Target (seconds)", stage: 2 },
            { key: "timeToSecondTarget", label: "Time to Second Target (seconds)", stage: 3 }
        ];
        
        configs.forEach((config, index) => {
            // Create label
            const label = createElement("label", config.label);
            label.parent(this.panel);
            label.style("display", "block");
            label.style("color", "#b4b4b4");
            label.style("font-size", "11px");
            if (index > 0) {
                label.style("margin-top", "10px");
            }
            label.style("margin-bottom", "5px");
            
            // Create container for input and play button (side by side)
            const inputRow = createDiv();
            inputRow.parent(this.panel);
            inputRow.style("display", "flex");
            inputRow.style("gap", "5px");
            inputRow.style("margin-bottom", "5px");
            
            // Create input
            const input = createInput(this.stageConfig[config.key].toString());
            input.parent(inputRow);
            input.style("flex", "1");
            input.style("box-sizing", "border-box");
            input.style("background-color", "#2a2a2a");
            input.style("color", "#c8c8c8");
            input.style("border", "1px solid #646464");
            input.style("border-radius", "4px");
            input.style("padding", "4px 8px");
            input.style("font-size", "12px");
            input.style("font-family", "monospace");
            
            // Create play button for this stage
            const stagePlayButton = createButton("▶");
            stagePlayButton.parent(inputRow);
            stagePlayButton.style("padding", "4px 12px");
            stagePlayButton.style("background-color", "#4a7c59");
            stagePlayButton.style("color", "#ffffff");
            stagePlayButton.style("border", "none");
            stagePlayButton.style("border-radius", "4px");
            stagePlayButton.style("font-size", "12px");
            stagePlayButton.style("font-family", "monospace");
            stagePlayButton.style("cursor", "pointer");
            stagePlayButton.style("transition", "background-color 0.2s");
            stagePlayButton.style("flex-shrink", "0");
            stagePlayButton.style("white-space", "nowrap");
            stagePlayButton.mouseOver(() => {
                stagePlayButton.style("background-color", "#5a9c69");
            });
            stagePlayButton.mouseOut(() => {
                stagePlayButton.style("background-color", "#4a7c59");
            });
            stagePlayButton.mousePressed(() => {
                if (this.startFromStageCallback) {
                    this.startFromStageCallback(config.stage);
                }
            });
            
            // Add change handler
            input.input(() => {
                const value = parseFloat(input.value());
                // Fields used as divisors (timeToFirstTarget, timeToSecondTarget) must be > 0
                // Other fields can be >= 0
                const isDivisorField = config.key === "timeToFirstTarget" || config.key === "timeToSecondTarget";
                const isValid = !isNaN(value) && (isDivisorField ? value > 0 : value >= 0);
                
                if (isValid) {
                    this.stageConfig[config.key] = value;
                    this.saveConfigToStorage();
                } else {
                    // Reset to current config value if invalid
                    input.value(this.stageConfig[config.key].toString());
                }
            });
            
            this.inputs[config.key] = input;
        });
    }

    updateInputValues() {
        // Update input values to match current config
        for (let key in this.inputs) {
            if (this.inputs[key]) {
                this.inputs[key].value(this.stageConfig[key].toString());
            }
        }
    }

    saveConfigToStorage() {
        try {
            localStorage.setItem("cosmicStageConfig", JSON.stringify(this.stageConfig));
        } catch (e) {
            console.warn("Could not save config to localStorage:", e);
        }
    }

    loadConfigFromStorage() {
        try {
            const saved = localStorage.getItem("cosmicStageConfig");
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with defaults to ensure all keys exist
                this.stageConfig.delayBeforeAppear = parsed.delayBeforeAppear ?? this.stageConfig.delayBeforeAppear;
                this.stageConfig.timeToFirstTarget = parsed.timeToFirstTarget ?? this.stageConfig.timeToFirstTarget;
                this.stageConfig.stayAtFirstTarget = parsed.stayAtFirstTarget ?? this.stageConfig.stayAtFirstTarget;
                this.stageConfig.timeToSecondTarget = parsed.timeToSecondTarget ?? this.stageConfig.timeToSecondTarget;
            }
        } catch (e) {
            console.warn("Could not load config from localStorage:", e);
        }
    }
}
