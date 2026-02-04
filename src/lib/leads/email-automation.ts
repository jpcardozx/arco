/**
 * Email Automation - Stub
 */

export async function sendAutomatedEmail(leadId: string) {
  console.log('Email automation stub');
  return { success: true };
}

export async function sendPendingEmails() {
  console.log('Send pending emails stub');
  return { success: true, sent: 0 };
}

export default { sendAutomatedEmail, sendPendingEmails };
