import { Moralis } from "moralis";

export const findBackupBundle = async (account, setTokenData) => {
  const Backup = Moralis.Object.extend("BundleBackup");
  const query = new Moralis.Query(Backup);
  query.equalTo("account", account);
  const res = await query.find();
  let ret = false

  if(res.length===0) {
    console.log("No backup bundle found")
    return ret;
  }

  await query.get(res[0].id).then(backup => {
    console.log("Found backup bundle with tokenId "+backup.get("tokenId"))
    const { tokenId, nonce, addressesArray, numbersArray } = backup.attributes;
    setTokenData([ tokenId, nonce, addressesArray, numbersArray]);
    ret = true;
  })
  return ret
}

export const saveBackupBundle = async (account, tokenData) => {
  const Backup = Moralis.Object.extend("BundleBackup");
  const backup = new Backup();

  backup.set("account", account);
  backup.set("tokenId", tokenData[0]);
  backup.set("nonce", tokenData[1]);
  backup.set("addressesArray", tokenData[2]);
  backup.set("numbersArray", tokenData[3]);
  backup.save();
};

export const destroyBackupBundle = async (tokenId) => {
  const Backup = Moralis.Object.extend("BundleBackup");
  const query = new Moralis.Query(Backup);
  query.equalTo("tokenId", tokenId);
  const res = await query.find();
  
  if(res.length===0) {
    console.warn("No backup found with tokenId "+tokenId);
    return;
  }

  query.get(res[0].id).then(backup => {
    backup.destroy()
    console.log("Destruction of backup with tokenId: "+tokenId)
  })
}