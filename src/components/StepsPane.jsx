/*eslint no-dupe-keys: "Off"*/
import { Steps } from "antd";
const { Step } = Steps;

const styles = {
  pane: {
    background: "rgb(118,123,223)",
    background: "linear-gradient(315deg, rgba(69,75,205,1) 0%, rgba(159,161,198,0.4) 50%, rgba(223,223,228,0.3) 100%)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center"
  }
};

const StepsPane = ({ tokensToTransfer, NFTsToTransfer, displayPaneMode }) => {
  const switchStep = () => {
    switch (displayPaneMode) {
      case "admin":
        return -1;
      case "start":
        return -1;
      case "tokens":
        return 0;
      case "nfts":
        return 1;
      case "bundle":
        return 2;
      case "transfer":
        return 3;
      case "done":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div style={styles.pane}>
      <Steps direction='vertical' current={switchStep()}>
        <Step
          title='Choose Tokens to transfer, if any'
          description={
            tokensToTransfer
              ? tokensToTransfer.length + " token" + (tokensToTransfer.length !== 1 ? "s" : "") + " selected"
              : "Select some of your ERC20 tokens, or all, or none, and click on OK when you're done."
          }
        />
        <Step
          title='Choose NFTs to transfer, if any'
          description={
            NFTsToTransfer
              ? NFTsToTransfer.length + " NFT" + (NFTsToTransfer.length !== 1 ? "s" : "") + " selected"
              : "Select some of your NFTs, or all, or none, and click on OK when you're done."
          }
        />
        <Step title='Bundle' description='Pack all your assets in one NFT for a single transaction.' />
        <Step title='Transfer' description='Get all your assets ready and waiting for you on your new wallet!' />
      </Steps>
    </div>
  );
};

export default StepsPane;
