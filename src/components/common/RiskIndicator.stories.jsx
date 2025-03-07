// RiskIndicator.stories.jsx
import RiskIndicator from './RiskIndicator';

export default {
  title: 'Components/RiskIndicator',
  component: RiskIndicator,
  parameters: {
    docs: {
      description: {
        component: 'Displays a risk score with color coding and optional label'
      }
    }
  }
};

// Different risk levels
export const LowRisk = () => <RiskIndicator score={25} />;
export const MediumRisk = () => <RiskIndicator score={40} />;
export const HighRisk = () => <RiskIndicator score={60} />;

// With various options
export const WithLabel = () => <RiskIndicator score={45} showLabel={true} />;
export const LargeSize = () => <RiskIndicator score={50} size="large" />;
