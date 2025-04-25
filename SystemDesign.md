# Single Points of Failure

SPOFs in this infrastructure are a single database instance, web server and dependencies that the system relies on.

Following mechanisms can mitigate risks and unforeseen events that can cause service disruptions, and increase system reliability and reduced downtime.   \

In disaster recovery scenarios, these failover mechanisms can be used to fully manage resource availability, secure the data, reduce downtime and mitigate the impact of outages.

## Failover Strategies

Redundancy involves creating and defining backups of critical components while failover is the backup when a failure occurs.

### Database

SaaS providers commonly choose vertical scaling as a first scaling approach. Vertical scaling increases the computing power of a single machine adding CPU, RAM, and hard disk to a database server to handle increasing traffic, which lets you support more concurrent connections.

#### Managed solutions

PostgreSQL clusters or multi-region deployments ensure databases are deployed across multiple regions or servers to ensure high availability. Tools like Amazon RDS, Google Cloud SQL, and Azure SQL offer managed services with failover support.  \

For instance, AWS offers managed sharding solution such as Aurora Limitless Database to reduce application routing complexity and simplify scaling and maintenance.

#### Horizontal scaling

Data access patterns for insurance products are predominantly based on geography. Geo sharding allows applications to retrieve information faster due to the shorter distance between the shard and the customer making the request. \

Database sharding is a horizontal scaling strategy that allocates additional nodes or computers to share the workload of an application.

#### Sharding

Unlike replication, database sharding does not result in high availability. When a data overload occurs on specific physical shards although others remain underloaded, it results in database hotspots. Hotspots slow down the retrieval process on the database. \

In horizontal scaling data distribution can be done evenly by using optimal shard keys, for instance, using coverage type- premium, medium or basic, age groups and geo location as a shard key to ensure even data distribution.

#### Availability zones

AWS RDS offers several database replication options for enhanced performance, durability, and disaster recovery.Multi-Availability Zone deployments synchronously replicate the primary database instance to a standby instance. It ensures high availability as it automatically fail over to the standby instance if the primary instance fails.  \

#### Replication

Read Replicas are read-only copies of the source DB instance that can offload read queries from the primary instance, therefore, improving the performance and scalability of read-heavy workloads. \ 

Database replication with master-slave setup has one database instance (master) responsible for writing, and one or more replicas (slaves) handles read queries. Cross-Region replication creates read replicas in a different regions than the primary instance and can be a disaster recovery strategy. 

### Server

#### Health monitoring

DNS systems must conduct ongoing health checks to determine the status and performance of the internet service provider (ISP), all network API endpoints and the primary IP servers. \ 

- Health checks can include Internet Control Message Protocol (ICMP) pings at the network level
- HTTP/HTTPS checks to assess web servers at the application level
- Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) checks at the port level and custom scripts

#### Auto scaling

Cloud services like AWS EC2, Google Compute Engine, and Azure Virtual Machines provide auto-scaling to automatically add or remove instances based on traffic load.

#### Horizontal scaling

Load balancers such as AWS ELB, Nginx, HAProxy distribute traffic across multiple instances of application and direct traffic to the other instances in case of a downtime.

#### Content delivery network

CDNs offer high availability and fault tolerance. If one server has a downtime, traffic can be rerouted to another server without affecting the end-user experience. It also covers DDoS protection, HTTPS encryption, and web application firewalls (WAFs) that improve the security of the web software.

#### DNS server failover

Managed DNS providers offer name server IPs to use and behind each of those IPs is a pool of geographically distributed DNS servers that route requests using Anycast.

Anycast DNS routes user requests to a network of resolvers to the closest available server for resolution, instead of a single resolver with communication one-to-one.

### Third-Party services

#### Circuit breaker design pattern

By reducing repeated calls to a failing service, circuit breaker stops making requests and enables fallback mechanism, such as returning cached data or perorming call retries. It guarantees system availability with reduced functionality while the failing service is unavailable and prevents cascading failures, where one failure can propagate and affect other parts of the system.  \

Retries and timeouts can be implemented as part of system recovery to avoid waiting indefinitely for external services that are slow or unavailable.

#### Health monitoring

The circuit breaker monitors calls to a particular service or resource for failures with a failure threshold, certain number of failures within a given condition.

In distributed systems and microservices architectures services can fail and recover independently, establishing recovery states- open, half-open, closed state or graceful degradation with reduced functionality.

### Application

#### Health monitoring

Implement monitoring and alerting systems, such as Prometheus, Grafana, Datadog or New Relic to detect failures in advance. Monitoring should cover:

- Server health with CPU, memory, disk usage

- Database replication status

- Service dependencies

Alerting systems notify the responsible teams or trigger automated responses in case of failure via responsible communication channels such as OpsGenie and Slack or Discord.


#### Architecture

Knowing the implications of architecture that are incorporated explicitly into the data model before making any new decisions that can affect SaaS operations is directly linked to increased complexity of the system.

For instance when a database architecture increases in complexity, it may challenge how to route requests to the correct database.

Breaking down your system into smaller, loosely coupled services can mitigate the risks of a SPOF affecting the entire system. Isolating the services independently is also easier in testing and restoring processes to enable reliable and fast data recovery and troubleshooting in case of a failure.

### Backups

Critical data must be backed up regularly. Backups protect your database from data loss by creating full or incremental restorable copies, or snapshots that is an instant image of your database at a point in time, common in cloud systems like AWS RDS. \

Snapshots are efficient for frequent restore points, while managed caching, e.g. Redis improves performance by storing frequently accessed data in memory, reducing the load on primary database. A solid strategy combines automated snapshots, offsite backup storage, caching for speed, and regular restore tests to ensure resilience and fast recovery. \

While cache doesn’t support joins, filters or aggregations query logic, it does lookup simple key-values to store the results of queries that doesn't change frequently. Pooling optimizes how often and how many database connections are used when the cache misses. \

With every deployment old process needs to gracefully shut down to free the port or container. Shutting down application in mid-write state can leave records in a partially updated state with transactions not committed or rolled back. Eventually, database will start rejecting the traffic or lead to slow queries and longer response times. Solution is always disconnecting database on exit to fully close old connections and prevent unexpected behavior on data transactions.
