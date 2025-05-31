document.addEventListener("DOMContentLoaded", (event) => {
    var ProgressBar = {
        init: function () {
            this.progressLabel = document.getElementById("progress-label");
            this.progressBar = document.getElementById("progress-bar");
            this.progressContainer = document.querySelector(".progress-container");
            this.animationFrameRequest = null;
            this.setupListeners();
        },

        setupListeners: function () {
            window.addEventListener("message", function (event) {
                if (event.data.action === "progress") {
                    ProgressBar.update(event.data);
                } else if (event.data.action === "cancel") {
                    ProgressBar.cancel();
                }
            });
        },

        update: function (data) {
            if (this.animationFrameRequest) {
                cancelAnimationFrame(this.animationFrameRequest);
            }
            clearTimeout(this.cancelledTimer);

            // Set default Arabic text if no label is provided
            if (data.label && data.label.trim() !== "") {
                this.progressLabel.textContent = data.label;
            } else {
                this.progressLabel.textContent = "جاري قطع الشجرة..";
            }
            
            this.progressContainer.style.display = "flex"; // Changed to flex for our new layout
            let startTime = Date.now();
            let duration = parseInt(data.duration, 10);

            const animateProgress = () => {
                let timeElapsed = Date.now() - startTime;
                let progress = timeElapsed / duration;
                if (progress > 1) progress = 1;
                let percentage = Math.round(progress * 100);
                this.progressBar.style.width = percentage + "%";
                
                if (progress < 1) {
                    this.animationFrameRequest = requestAnimationFrame(animateProgress);
                } else {
                    this.onComplete();
                }
            };
            this.animationFrameRequest = requestAnimationFrame(animateProgress);
        },

        cancel: function () {
            if (this.animationFrameRequest) {
                cancelAnimationFrame(this.animationFrameRequest);
                this.animationFrameRequest = null;
            }
            this.progressLabel.textContent = "تم الإلغاء"; // "Cancelled" in Arabic
            this.progressBar.style.width = "100%";
            this.cancelledTimer = setTimeout(this.onCancel.bind(this), 1000);
        },

        onComplete: function () {
            this.progressContainer.style.display = "none";
            this.progressBar.style.width = "0";
            this.postAction("FinishAction");
        },

        onCancel: function () {
            this.progressContainer.style.display = "none";
            this.progressBar.style.width = "0";
        },

        postAction: function (action) {
            fetch(`https://progressbar/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
        },

        closeUI: function () {
            let mainContainer = document.querySelector(".main-container");
            if (mainContainer) {
                mainContainer.style.display = "none";
            }
        },
    };

    ProgressBar.init();
});
