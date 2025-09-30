#!/usr/bin/env python3
"""
Automated Website Testing Script for Rare Regalia Ecommerce
Tests all major functionality and generates a comprehensive report
"""

import requests
import json
import time
from datetime import datetime
from pathlib import Path

class WebsiteTester:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": base_url,
            "tests": {}
        }
        
    def test_page_response(self, path, expected_status=200):
        """Test if a page returns the expected status code"""
        url = f"{self.base_url}{path}"
        try:
            response = requests.get(url, timeout=10)
            success = response.status_code == expected_status
            return {
                "url": url,
                "status_code": response.status_code,
                "expected": expected_status,
                "success": success,
                "response_time": response.elapsed.total_seconds(),
                "content_length": len(response.content)
            }
        except Exception as e:
            return {
                "url": url,
                "error": str(e),
                "success": False,
                "response_time": None,
                "content_length": 0
            }
    
    def test_api_endpoint(self, path):
        """Test API endpoints"""
        url = f"{self.base_url}{path}"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                try:
                    data = response.json()
                    return {
                        "url": url,
                        "status_code": response.status_code,
                        "success": True,
                        "data_type": type(data).__name__,
                        "data_length": len(data) if isinstance(data, list) else 1,
                        "response_time": response.elapsed.total_seconds()
                    }
                except json.JSONDecodeError:
                    return {
                        "url": url,
                        "status_code": response.status_code,
                        "success": False,
                        "error": "Invalid JSON response",
                        "response_time": response.elapsed.total_seconds()
                    }
            else:
                return {
                    "url": url,
                    "status_code": response.status_code,
                    "success": False,
                    "response_time": response.elapsed.total_seconds()
                }
        except Exception as e:
            return {
                "url": url,
                "error": str(e),
                "success": False,
                "response_time": None
            }
    
    def test_image_availability(self, image_paths):
        """Test if images are accessible"""
        results = []
        for path in image_paths:
            url = f"{self.base_url}{path}"
            try:
                response = requests.head(url, timeout=5)
                results.append({
                    "url": url,
                    "status_code": response.status_code,
                    "success": response.status_code == 200,
                    "content_type": response.headers.get('content-type', ''),
                    "content_length": response.headers.get('content-length', 0)
                })
            except Exception as e:
                results.append({
                    "url": url,
                    "error": str(e),
                    "success": False
                })
        return results
    
    def run_comprehensive_tests(self):
        """Run all tests and generate comprehensive report"""
        print("🧪 Starting Comprehensive Website Tests...")
        print("=" * 60)
        
        # Test 1: Core Pages
        print("1️⃣ Testing Core Pages...")
        core_pages = [
            "/",
            "/products",
            "/about",
            "/contact"
        ]
        
        self.results["tests"]["core_pages"] = {}
        for page in core_pages:
            result = self.test_page_response(page)
            self.results["tests"]["core_pages"][page] = result
            status = "✅" if result["success"] else "❌"
            print(f"   {status} {page}: {result.get('status_code', 'ERROR')}")
        
        # Test 2: API Endpoints
        print("\\n2️⃣ Testing API Endpoints...")
        api_endpoints = [
            "/api/products",
            "/api/categories",
            "/api/products?category=rings",
            "/api/products?limit=10"
        ]
        
        self.results["tests"]["api_endpoints"] = {}
        for endpoint in api_endpoints:
            result = self.test_api_endpoint(endpoint)
            self.results["tests"]["api_endpoints"][endpoint] = result
            status = "✅" if result["success"] else "❌"
            data_info = f" ({result.get('data_length', 0)} items)" if result["success"] else ""
            print(f"   {status} {endpoint}: {result.get('status_code', 'ERROR')}{data_info}")
        
        # Test 3: Static Assets
        print("\\n3️⃣ Testing Static Assets...")
        static_assets = [
            "/images/hero-jewelry.jpg",
            "/images/products/0111/0111-Render-R1.jpg",
            "/images/products/1201/1201-Render-R1.jpg",
            "/_next/static/css/app.css"  # This might not exist but worth checking
        ]
        
        asset_results = self.test_image_availability(static_assets)
        self.results["tests"]["static_assets"] = {}
        for i, asset in enumerate(static_assets):
            result = asset_results[i]
            self.results["tests"]["static_assets"][asset] = result
            status = "✅" if result["success"] else "❌"
            print(f"   {status} {asset}: {result.get('status_code', 'ERROR')}")
        
        # Test 4: Product Detail Pages (Sample)
        print("\\n4️⃣ Testing Sample Product Pages...")
        sample_products = [
            "/products/0111-Ro-1",
            "/products/1201-Ro-300",
            "/products/invalid-sku"  # This should return 404
        ]
        
        self.results["tests"]["product_pages"] = {}
        for product in sample_products:
            expected_status = 404 if "invalid" in product else 200
            result = self.test_page_response(product, expected_status)
            self.results["tests"]["product_pages"][product] = result
            status = "✅" if result["success"] else "❌"
            print(f"   {status} {product}: {result.get('status_code', 'ERROR')}")
        
        # Test 5: Performance Check
        print("\\n5️⃣ Performance Analysis...")
        self.analyze_performance()
        
        # Generate Summary
        print("\\n" + "=" * 60)
        self.generate_summary()
        
        return self.results
    
    def analyze_performance(self):
        """Analyze performance metrics"""
        performance_data = {}
        
        # Test home page load time multiple times
        load_times = []
        for i in range(3):
            result = self.test_page_response("/")
            if result["success"] and result["response_time"]:
                load_times.append(result["response_time"])
            time.sleep(1)
        
        if load_times:
            performance_data["home_page"] = {
                "avg_load_time": sum(load_times) / len(load_times),
                "min_load_time": min(load_times),
                "max_load_time": max(load_times),
                "tests_run": len(load_times)
            }
            
            avg_time = performance_data["home_page"]["avg_load_time"]
            status = "✅" if avg_time < 3.0 else "⚠️" if avg_time < 5.0 else "❌"
            print(f"   {status} Home page avg load time: {avg_time:.2f}s")
        
        self.results["tests"]["performance"] = performance_data
    
    def generate_summary(self):
        """Generate test summary"""
        total_tests = 0
        passed_tests = 0
        
        for test_category, tests in self.results["tests"].items():
            if test_category == "performance":
                continue
                
            for test_name, result in tests.items():
                total_tests += 1
                if result.get("success", False):
                    passed_tests += 1
        
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"📊 TEST SUMMARY:")
        print(f"   Total Tests: {total_tests}")
        print(f"   Passed: {passed_tests}")
        print(f"   Failed: {total_tests - passed_tests}")
        print(f"   Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 90:
            print("   🎉 EXCELLENT - Website is functioning very well!")
        elif success_rate >= 75:
            print("   ✅ GOOD - Website is mostly functional with minor issues")
        elif success_rate >= 50:
            print("   ⚠️ FAIR - Website has several issues that need attention")
        else:
            print("   ❌ POOR - Website has major issues requiring immediate attention")
        
        self.results["summary"] = {
            "total_tests": total_tests,
            "passed_tests": passed_tests,
            "failed_tests": total_tests - passed_tests,
            "success_rate": success_rate
        }
    
    def save_report(self, filename="test_report.json"):
        """Save detailed test report"""
        with open(filename, 'w') as f:
            json.dump(self.results, f, indent=2)
        print(f"\\n📄 Detailed report saved to: {filename}")

def main():
    """Main testing function"""
    print("🚀 Rare Regalia Ecommerce Website Tester")
    print("=" * 60)
    
    # Check if server is running
    tester = WebsiteTester()
    try:
        response = requests.get(tester.base_url, timeout=5)
        print(f"✅ Server is running at {tester.base_url}")
    except requests.exceptions.RequestException:
        print(f"❌ Server is not accessible at {tester.base_url}")
        print("   Please make sure the development server is running:")
        print("   cd ecommerce-website && npm run dev")
        return
    
    # Run comprehensive tests
    results = tester.run_comprehensive_tests()
    
    # Save report
    tester.save_report(f"test_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
    
    print("\\n🏁 Testing completed!")

if __name__ == "__main__":
    main()