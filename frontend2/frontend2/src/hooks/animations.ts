// animations.ts
import { keyframes } from "@emotion/react";
import { alpha } from "@mui/material/styles";
import { lightColors } from "./theme";

export const pulse = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 ${alpha(lightColors.success, 0.7)};
    }
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px ${alpha(lightColors.success, 0)};
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 ${alpha(lightColors.success, 0)};
    }
`;

export const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

export const glow = keyframes`
    0% { box-shadow: 0 0 5px ${alpha(lightColors.primary, 0.5)}; }
    50% { box-shadow: 0 0 20px ${alpha(lightColors.primary, 0.8)}; }
    100% { box-shadow: 0 0 5px ${alpha(lightColors.primary, 0.5)}; }
`;
