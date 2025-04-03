const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const resultDiv = document.getElementById('result');
        const previewBox = document.getElementById('preview-box');

        function calculateAspectRatio() {
            const width = parseFloat(widthInput.value);
            const height = parseFloat(heightInput.value);

            if (!width || !height || width <= 0 || height <= 0) {
                resultDiv.innerHTML = '<p style="color: #ff4444;">Please enter valid positive numbers</p>';
                previewBox.style.opacity = '0.5';
                return;
            }

            const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
            const divisor = gcd(width, height);
            const aspectWidth = width / divisor;
            const aspectHeight = height / divisor;
            const decimalRatio = (width / height).toFixed(2);

            resultDiv.innerHTML = `
                <p>
                    <span style="font-size: 2rem; display: block; margin-bottom: 10px;">
                        ${aspectWidth}:${aspectHeight}
                    </span>
                    <span style="color: #666; font-size: 1rem;">
                        or ${decimalRatio}:1
                    </span>
                </p>
            `;

            // Update preview box with improved scaling
            const previewContainer = previewBox.parentElement;
            const containerWidth = previewContainer.clientWidth - 40; // Account for padding
            const containerHeight = previewContainer.clientHeight - 40;
            
            const scaleWidth = containerWidth / aspectWidth;
            const scaleHeight = containerHeight / aspectHeight;
            const scale = Math.min(scaleWidth, scaleHeight);
            
            const finalWidth = aspectWidth * scale;
            const finalHeight = aspectHeight * scale;
            
            previewBox.style.width = `${finalWidth}px`;
            previewBox.style.height = `${finalHeight}px`;
            previewBox.style.opacity = '1';
            document.getElementById('preview-text').textContent = `${aspectWidth}:${aspectHeight}`;
        }

        function setInitialPreviewBox() {
            const previewContainer = previewBox.parentElement;
            const containerWidth = previewContainer.clientWidth - 40;
            const containerHeight = previewContainer.clientHeight - 40;
            const initialSize = Math.min(containerWidth, containerHeight);
            
            previewBox.style.width = `${initialSize}px`;
            previewBox.style.height = `${initialSize}px`;
            previewBox.style.opacity = '0.7';
            document.getElementById('preview-text').textContent = '1:1';
        }

        function resetCalculator() {
            widthInput.value = '';
            heightInput.value = '';
            resultDiv.innerHTML = '<p>Enter dimensions to see the aspect ratio</p>';
            setInitialPreviewBox();
        }

        widthInput.addEventListener('input', calculateAspectRatio);
        heightInput.addEventListener('input', calculateAspectRatio);

        window.addEventListener('load', setInitialPreviewBox);
        window.addEventListener('resize', setInitialPreviewBox);