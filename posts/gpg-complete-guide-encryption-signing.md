---
title: "GPG: A Complete Guide to Key Generation, Encryption, and Signing"
titleIcon: https://portapps.io/img/app/gnupg.png
titleColor: "#0998df,#e3e3e3"
publishDate: "2025-05-16"
updatedDate: "2025-05-16"
tags: ["GPG", "Encryption", "Security", "Privacy", "Linux", "CLI"]
categories: ["Tutorial", "Security"]
description: |
  Learn how to use GPG (GNU Privacy Guard) to generate and manage cryptographic keys, encrypt and decrypt files, and digitally sign messages. This comprehensive guide walks you through key generation, exporting, backups, and common commands with examples for Linux, macOS, and Windows.
---
# 🔐 GPG: A Complete Guide to Key Generation, Encryption, and Signing

GPG (GNU Privacy Guard) is a powerful tool for creating cryptographic keys, encrypting and decrypting data, and digitally signing content. This tutorial will guide you through generating GPG keys, exporting and managing them, and using GPG to encrypt, decrypt, and sign messages.

## 📦 Prerequisites

  - Linux (Debian/Ubuntu)
  
    ```bash
    sudo apt update
    sudo apt install gnupg
    ```

  - MacOS
  
    ```bash
    brew install gnupg
    ```
  
  - Windows
  
    Download and install:    
    - GPG (Gpg4win): https://gpg4win.org/

## 🔑 Generating a GPG Key

To generate a GPG key, run the following command in your terminal:

```bash
gpg --full-generate-key
```

You’ll be prompted to answer a few questions:

- **Key type**: Choose `1` for RSA and RSA.
- **Key size**: Type `4096` (for strong security).
- **Key expiration**: Set it as you prefer (`0` means it never expires).
- **Name and email**: Provide your name and email (this can be any identity).
  - Can use your Git identity (git config user.name, git config user.email).
- **Passphrase**: Set a secure passphrase to protect the key.

## 🔑 Listing your GPG Keys

To list your private keys (those you own):

```bash
gpg --list-secret-keys
```

To list your public keys (those you or others can share):

```bash
gpg --list-keys
```

Show your key fingerprint:

```bash
gpg --fingerprint <your_email_address or key_id>
```

## 🔑 Exporting your GPG Key

You can export your public key to share it with others or upload it to a key server.

```bash
gpg --armor --export <your_email_address or key_id> > public.key
```

## ⚠️ Export and Backup Your Private Key (Careful!)

Only do this if you absolutely need to (e.g., for transferring to another device). Protect this file as if it were your master password.

```bash
gpg --armor --export-secret-keys <your_email_address or key_id> > private-key.asc
```

To re-import it later:

```bash
gpg --import private-key.asc
```

## 💥 Creating a Revocation Certificate (If Compromised or Lost)

First, generate a revocation certificate (you should do this right after creating the key):

```bash
gpg --output revoke-cert.asc --gen-revoke <your_email_address or key_id>
```

If you lose control of your key or forget the passphrase, you can use this file to revoke the key.

To apply the revocation:

```bash
gpg --import revoke-cert.asc
```

Then, delete the key:

```bash
gpg --delete-secret-key <your_email_address or key_id>
```

(Optional) Delete the public key as well:

```bash
gpg --delete-key <your_email_address or key_id>
```

## 🔐 Encrypt and Decrypt Messages

Encrypt a message:

```bash
gpg --output message.txt.asc --encrypt --armor --recipient <recipient_email_address> message.txt
```

Decrypt a message:

```bash
gpg --decrypt --output message.txt < encrypted-message.txt.gpg
```

## ✍️ Signing and Verifying Messages

Sign a File (Creates ASCII-armored Signed File)

```bash
gpg --output message.txt.asc --sign --armor message.txt
```

Detached Signature

```bash
gpg --output message.txt.asc --detach-sign --armor message.txt
```

Verify a Signed File

```bash
gpg --verify message.txt.asc
```

Verify a Detached Signature

```bash
gpg --verify message.sig message.txt
```

Clearsign a Message (inline)

```bash
gpg --output message.txt.asc --clearsign --armor message.txt
```


## ☁️ Uploading Your Public Key to a Keyserver

Uploading your public key allows others to find it and send you encrypted messages or verify your signatures.

```bash
# Using keys.openpgp.org
gpg --send-keys --keyserver hkps://keys.openpgp.org <your_email_address or key_id>

# Or Ubuntu’s keyserver
gpg --send-keys --keyserver keyserver.ubuntu.com <your_email_address or key_id>
```

# 💡 Tips

- Always back up your GPG keys securely.
- Use a password manager to store your passphrase.
- Upload your public key to a keyserver if you want others to find and use it:
  ```bash
  # Upload your key to a public keyserver
  gpg --keyserver hkps://keys.openpgp.org --send-keys <your_key_id>
  ```

# 📘 Resources

- [GnuPG Official Documentation](https://gnupg.org/documentation/)
- [DigitalOcean GPG Guide](https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages)
- [GitHub GPG Guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
- [keys.openpgp.org](https://keys.openpgp.org/)
