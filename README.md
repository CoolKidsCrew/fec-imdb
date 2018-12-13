# fec-fmdb

Fake Movie Database

An IMDb movie page clone back-end that is stress tested, and scaled to optimization.

Tech: React | NodeJS | MongoDB | Docker | Artillery | Loader.io | Nginx | EC2 | S3

- Scaled micro service to handle 4500 RPS with 10 million records of user data by deploying three Node servers with Nginx and Nginx caching.
- Reduced latency by 600% by re-writing back-end from Mongoose ODM to MongoDB Native Driver and indexing the required tables for read-only operations.
- Generated 10 million realistic records in optimal time through NodeJS' stream.
