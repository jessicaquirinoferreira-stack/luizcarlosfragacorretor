# Security Specification — Luiz Carlos Fraga Imóveis

## 1. Data Invariants
- **Public Visibility**: The general public may only read properties with `status == 'published'`, developments with `isPublished == true`, active landing pages with `isActive == true`, and site settings.
- **Lead Submission**: Unauthenticated public users can submit leads (create only), but may never read, list, update, or delete existing leads (preventing PII scraping of prospective buyers).
- **Admin Control**: Only authenticated users whose UID is registered in the `/admins/` collection or matching verified admin credentials can perform write/update/delete on properties, developments, site settings, landing pages, and lead updates.
- **Strict Validation**: All IDs must match `^[a-zA-Z0-9_\-]+$`. Strings have enforced maximum lengths to prevent resource exhaustion attacks.

## 2. The "Dirty Dozen" Payloads (Designed to Fail)
1. **Unpublished Property Leak**: Anonymous or non-admin user querying `/properties/{id}` where `status == 'draft'`. Must return PERMISSION_DENIED.
2. **Lead List Harvester**: Anonymous user attempting `list` on `/leads`. Must return PERMISSION_DENIED.
3. **Ghost Property Injection**: Non-admin sending a create payload to `/properties/fake-id`. Must return PERMISSION_DENIED.
4. **Lead PII Read**: Attempting `get` on `/leads/{leadId}` without admin authentication. Must return PERMISSION_DENIED.
5. **Admin Self-Promotion**: Unauthenticated user writing directly to `/admins/{anyUid}`. Must return PERMISSION_DENIED.
6. **Property Shadow Update**: Non-admin updating price or status of a published property. Must return PERMISSION_DENIED.
7. **Lead Tampering**: Public user updating status of a lead to `convertido`. Must return PERMISSION_DENIED.
8. **Oversized String Bomb**: Payload containing a 500KB string in `title` or `description`. Must fail validation.
9. **Settings Override**: Unauthenticated user updating WhatsApp number or bank info in `/siteSettings/settings`. Must return PERMISSION_DENIED.
10. **ID Poisoning**: Document creation with an ID containing malicious symbols or path traversals (`../../`). Must be rejected by `isValidId`.
11. **Landing Page Deletion**: Non-admin attempting `delete` on `/landingPages/{pageId}`. Must return PERMISSION_DENIED.
12. **Development Alteration**: Non-admin updating starting price or units in `/developments/{devId}`. Must return PERMISSION_DENIED.
