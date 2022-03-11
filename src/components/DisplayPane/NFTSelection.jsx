/*eslint no-dupe-keys: "Off"*/
import React, { useEffect, useState } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import { Card, Image, Spin, Alert, Button } from "antd";
const { Meta } = Card;

const styles = {
  NFTSelection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "auto",
    padding: "30px",
    alignItems: "center",
    height: "80vh"
  },
  NFTs: {
    overflowX: "hidden",
    maxHeight: "90%",
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "15px"
  },
  text: {
    color: "#eee",
    fontFamily: "Sora, sans-serif",
    fontWeight: "600",
    letterSpacing: "1px",
    fontSize: "25px",
    margin: "20px auto"
  },
  buttonDiv: {
    margin: "15px 30px 15px 0",
    textAlign: "right",
    width: "100%"
  },
  button: {
    margin: "0 5px",
    texAlign: "center",
    padding: "5px 40px",
    background: "black",
    border: 0,
    color: "white",
    fontWeight: 600
  }
};

function NFTSelection({ NFTsToTransfer, setNFTsToTransfer, onFinishSelection }) {
  const NFTsPerPage = 100;
  const [fetchedNFTs, setFetchedNFTs] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState(NFTsToTransfer ?? []);
  const { verifyMetadata } = useVerifyMetadata();
  const [isNFTloading, setIsNFTLoading] = useState(true);
  const { chainId } = useMoralis();
  const { data: NFTBalances, isLoading, isFetching } = useNFTBalances({ chainId: chainId, limit: NFTsPerPage });

  useEffect(() => {
    const cleanupFunction = () => {
      if (!isLoading && !isFetching) {
        addFetchedNFTs();
      }
    };
    cleanupFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  const addFetchedNFTs = () => {
    if (NFTBalances) {
      let nextFetchedNFTs = fetchedNFTs;
      nextFetchedNFTs.push(...NFTBalances.result);
      setFetchedNFTs(nextFetchedNFTs);
      setIsNFTLoading(false);
    }
  };

  const isNFTSelected = (currentNft) =>
    selectedNFTs.some((nft) => currentNft.token_id === nft.token_id && currentNft.token_address === nft.token_address);

  const handleClickCard = (clickedNFT) => {
    if (isNFTSelected(clickedNFT)) {
      setSelectedNFTs(
        selectedNFTs.filter(
          (nft) => clickedNFT.token_id !== nft.token_id || clickedNFT.token_address !== nft.token_address
        )
      );
    } else {
      setSelectedNFTs(selectedNFTs.concat([clickedNFT]));
    }
  };

  const onSelectAllNFTs = () => {
    if (selectedNFTs.length < fetchedNFTs.length) {
      setSelectedNFTs(fetchedNFTs);
    } else {
      setSelectedNFTs([]);
    }
  };

  const selectButtonText = selectedNFTs.length < fetchedNFTs.length ? "Select All" : "Deselect All";

  const onValidateNFTSelection = () => {
    setNFTsToTransfer(selectedNFTs);
    onFinishSelection();
  };

  const NFTMapper = (nft, index) => {
    nft = verifyMetadata(nft);
    return (
      <Card
        onClick={() => handleClickCard(nft)}
        size='small'
        hoverable
        style={{
          width: 190,
          border: isNFTSelected(nft) ? "2px solid white" : undefined,
          opacity: isNFTSelected(nft) ? "1" : "0.9",
          transform: isNFTSelected(nft) ? undefined : "scale(0.9)"
        }}
        cover={
          <Image
            preview={false}
            src={nft?.image || "error"}
            fallback='data:image/png;base64,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'
            alt=''
            style={{ height: "190px" }}
          />
        }
        key={index}
      >
        <Meta title={nft.name} description={nft.contract_type} />
      </Card>
    );
  };

  return (
    <div style={styles.NFTSelection}>
      <div style={styles.text}>
        <p>Select NFTs to transfer</p>
      </div>
      {fetchedNFTs?.length < NFTBalances?.total && (
        <Alert
          type='warning'
          closable={true}
          showIcon
          message={`Sorry, you can only move the ${NFTsPerPage} shown here, you will have to carry out another transfer`}
        />
      )}
      <div style={{ ...styles.NFTs, overflowY: isNFTloading ? "hidden" : "scroll" }}>
        <Spin size='large' spinning={isNFTloading} />
        {fetchedNFTs && fetchedNFTs?.map(NFTMapper)}
      </div>
      <div style={styles.buttonDiv}>
        <Button style={styles.button} shape='round' onClick={onSelectAllNFTs}>
          {selectButtonText}
        </Button>
        <Button style={styles.button} shape='round' onClick={onValidateNFTSelection}>
          OK
        </Button>
      </div>
    </div>
  );
}

export default NFTSelection;
