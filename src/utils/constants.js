export const apiUrls = {
  login: '/api/users/login',
  allZones: '/api/zones',
  postSlot: '/api/slots',
  updateSlotStatus: '/api/slots/:slotId',
  updateSiteStatus: '/api/sites/:siteId',
  getSitesBasedOnZoneId: '/api/zones/:zoneId/sites',
  getSlotsBasedOnSiteId: '/api/sites/:siteId/slots',
  getSlotDetailsBasedOnSlotId: '/api/slots/:slotId',
  getAvailableSlotDetailsBasedOnSiteId: '/api/sites/:siteId/slots?date=:date&onlyFreeSlots=:availableFlag',
  getDowntimeAuditOnSlotId: '/api/machineryDowntimeAudit/:siteId',
};
