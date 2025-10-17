import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function verifyAnalysis() {
  const analysisId = '62a5bb0b-bd45-45e0-8eab-a0a08586f64a'
  
  console.log('🔍 Checking analysis_requests table...\n')
  
  const { data: request, error: requestError } = await supabase
    .from('analysis_requests')
    .select('*')
    .eq('id', analysisId)
    .single()
  
  if (requestError) {
    console.error('❌ Error fetching request:', requestError.message)
  } else if (request) {
    console.log('✅ analysis_requests entry found:')
    console.log(JSON.stringify({
      id: request.id,
      url: request.url,
      status: request.status,
      arco_index: request.arco_index,
      created_at: request.created_at,
      user_id: request.user_id || 'null (anonymous)'
    }, null, 2))
  } else {
    console.log('❌ No analysis_request found')
  }
  
  console.log('\n🔍 Checking analysis_results table...\n')
  
  const { data: result, error: resultError } = await supabase
    .from('analysis_results')
    .select('*')
    .eq('analysis_id', analysisId)
    .single()
  
  if (resultError) {
    console.error('❌ Error fetching result:', resultError.message)
  } else if (result) {
    console.log('✅ analysis_results entry found:')
    console.log(JSON.stringify({
      analysis_id: result.analysis_id,
      lcp: result.lcp,
      fid: result.fid,
      cls: result.cls,
      lighthouse_performance: result.lighthouse_performance,
      lighthouse_accessibility: result.lighthouse_accessibility,
      lighthouse_seo: result.lighthouse_seo,
      lighthouse_best_practices: result.lighthouse_best_practices
    }, null, 2))
  } else {
    console.log('❌ No analysis_result found')
  }
}

verifyAnalysis().catch(console.error)
